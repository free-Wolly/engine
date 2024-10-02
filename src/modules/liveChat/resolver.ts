import {
  CreateMessageInput,
  GetClientLatestChatIdInput,
  MutationCreateMessageArgs,
  QueryGetAllChatArgs,
  QueryGetClientLatestChatIdArgs,
  QueryGetMessagesArgs,
  SubscriptionMessageSentArgs,
} from 'graphql/generated/graphql';
import { ContextType } from 'services/createServer';
import sendNotification from '../../services/sendNotification';
import { pubsub } from '../../index';
import { sendSlackNotification } from './helpers';
import formatMessage from '../../localization/intl';
import { generateSearchQuery } from '../../utils';

export default {
  Query: {
    getClientLatestChatId: async (
      _: unknown,
      { data }: QueryGetClientLatestChatIdArgs,
      { db, req: { meClient, meCrmUser } }: ContextType,
    ) => {
      if (!meClient?.id && !data.guestClientId) {
        return null;
      }

      const chat = await db.chat.findFirst({
        where: {
          ...(meClient?.id ? { clientId: meClient?.id } : { guestClientId: data.guestClientId }),
        },
      });

      return chat?.chatUUID;
    },
    getMessages: async (data: any, args: QueryGetMessagesArgs, { db, req }: ContextType) => {
      const { meCrmUser, meClient } = req ?? {};
      const { chatUUID } = args;
      const { skip, take } = generateSearchQuery(args);
      const language = req?.language ?? 'KA';

      try {
        const messages = await db.message.findMany({
          where: {
            ...(chatUUID
              ? { chatUUID }
              : meClient?.id
              ? { sentByClientId: meClient?.id }
              : { sentBySupportId: meCrmUser?.id }),
          },
          orderBy: {
            createdAt: 'desc',
          },
          take,
          skip,
        });
        const totalCount = await db.message.count({
          where: {
            ...(chatUUID
              ? { chatUUID }
              : meClient?.id
              ? { sentByClientId: meClient?.id }
              : { sentBySupportId: meCrmUser?.id }),
          },
        });
        return {
          messages,
          totalCount,
        };
      } catch (error) {
        throw new Error(formatMessage(language, 'chat.messagesNotFound'));
      }
    },

    getAllChat: async (_s: unknown, args: QueryGetAllChatArgs, { db, req }: ContextType) => {
      const { skip, take } = generateSearchQuery(args);
      const language = req?.language ?? 'KA';

      try {
        const chats = await db.chat.findMany({
          skip,
          take,
          include: {
            client: true,
          },
        });

        const processedChats = chats.map(chat => {
          return {
            chatUUID: chat.chatUUID,
            id: chat.id,
            clientId: chat?.clientId,
            guestClientId: chat.guestClientId,
            firstName: chat.client?.firstName,
            lastName: chat.client?.lastName,
            updatedAt: chat.updatedAt,
            createdAt: chat.createdAt,
          };
        });

        return processedChats;
      } catch (error) {
        throw new Error(formatMessage(language, 'chat.chatsNotFound'));
      }
    },

    // getAllOrders: async (_: unknown, args: QueryGetAllOrdersArgs, { db, req: { userId, language } }: ContextType) => {
    //   const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
    //   const orders = await db.order.findMany({
    //     skip,
    //     take,
    //     where: {
    //       ...whereQuery,
    //       clientId: userId,
    //     },
    //     include: {
    //       // assignedEmployees: true,
    //       // assignedTools: true,
    //       // client: true,
    //       // products: true,
    //       address: true,
    //       apartmentCleaning: true,
    //     },
    //     ...sortQuery,
    //   });

    //   return orders;
    // },
  },

  Mutation: {
    createMessage: async (
      _: unknown,
      { data }: MutationCreateMessageArgs,
      { db, req: { language, meClient, meCrmUser } }: ContextType,
    ) => {
      const { chatUUID, guestClientId, text, image, video } = data;

      const lastMessage = await db.message.findFirst({
        where: {
          chatUUID,
          sentByClientId: meClient?.id || guestClientId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const message = await db.message.create({
        data: {
          image,
          video,
          text: text,
          chat: {
            connect: {
              chatUUID: chatUUID,
            },
          },
          sentByClientId: meClient?.id ?? guestClientId,
          sentBySupportId: meCrmUser?.id,
        },
      });

      let shouldSendNotification = true;
      if (lastMessage?.createdAt) {
        const lastMessageDate = lastMessage.createdAt;
        const currentDate = new Date();
        const diff = currentDate.getTime() - lastMessageDate.getTime();
        const diffMinutes = Math.round(diff / 60000);

        if (diffMinutes < 1) {
          shouldSendNotification = false;
        }
      }
      if (meClient?.id || guestClientId) {
        if (!lastMessage || shouldSendNotification) {
          let message = text;

          if (video) {
            message = 'მომხმარებელმა გამოაგზავნა ვიდეო';
          } else if (image) {
            message = 'მომხმარებელმა გამოაგზავნა სურათი';
          }

          sendSlackNotification(
            `${message} https://crm.wolly.ge/chats/${chatUUID}`,
            'https://hooks.slack.com/services/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',
          );
        }
      } else {
        const chat = await db.chat.findFirst({
          where: {
            chatUUID,
            clientId: {
              not: null,
            },
          },
          include: {
            client: true,
          },
        });
        if (chat?.clientId) {
          const client = await db.client.findFirst({
            where: {
              id: chat?.clientId,
            },
          });
          if (client?.pushToken) {
            sendNotification({
              pushToken: client?.pushToken,
              body: formatMessage(language, 'chat.newMessage'),
              type: 'ReceivedMessage',
              data: chatUUID,
            });
          }
        }
      }

      pubsub.publish(chatUUID, {
        messageSent: {
          chatUUID,
          id: message.id,
          text: message.text,
          sentByClientId: message.sentByClientId,
          sentBySupportId: message.sentBySupportId,
        },
      });

      return message;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: async (_: unknown, { data }: SubscriptionMessageSentArgs, context: ContextType) => {
        const { chatUUID, guestClientId } = data;

        if (!guestClientId && !context.req.userId) {
          throw new Error('Please provide guestClientId or login');
        }

        const existingChat = await context.db.chat.findUnique({
          where: {
            chatUUID,
          },
        });

        if (!existingChat) {
          await context.db.chat.create({
            data: {
              chatUUID,
              ...(context.req.userId && {
                client: {
                  connect: {
                    id: context.req.userId,
                  },
                },
              }),
              guestClientId: guestClientId,
            },
          });
        }

        return pubsub.asyncIterator(chatUUID);
      },
    },
  },
};

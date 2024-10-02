import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import normalizeEmail from 'normalize-email';
// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import formatMessage from '../../localization/intl';
import transformUser from '../../utils/transformers';
import { isAuthenticated, validateInput, generateRandomNumber } from '../../utils';
import smsSendNando from '../../services/smsSendNando';
import sendSMS from '../../services/sms';
import { ContextType } from '../../index';
import {
  AuthType,
  MutationClientSignUpArgs,
  MutationResendVerificationCodeArgs,
  MutationSigninArgs,
  MutationUpdateMyProfileArgs,
  MutationVerifyCodeArgs,
} from '../../graphql/generated/graphql';
import { trackError } from '../../services/sentry';
import { sendSlackNotification } from '../../modules/liveChat/helpers';

const CONFIG = {
  maxAge: 1000 * 60 * 60 * 24 * 10, // 10 day cookie
};

export default {
  Query: {
    // @ts-ignore
    me: combineResolvers(isAuthenticated, async (_, { authType }, { req: { userId }, db }: ContextType) => {
      // @ts-ignore
      const user = await db[authType].findUnique({
        where: { id: userId },
        include: {
          addresses: {
            include: { city: true },
          },
        },
      });
      return transformUser(user);
    }),
  },
  Mutation: {
    // @ts-ignore
    sendVerificationCode: combineResolvers(
      validateInput,
      // @ts-ignore
      async (_, { data: { mobile, androidSignature }, language }, { db }: ContextType) => {
        let user;
        user = await db.client.findUnique({
          where: { mobile },
        });
        if (!user) {
          throw new Error(formatMessage(language, 'auth.mobileNotFound', { mobile }));
        }

        const code = generateRandomNumber(4);

        try {
          await sendSMS(mobile, code, androidSignature);
        } catch (error) {
          trackError(error);
          throw new Error(formatMessage(language, 'auth.codeNotSent'));
        }

        await db.client.update({
          where: { mobile },
          data: { verificationCode: code.toString() },
        });

        return { message: formatMessage(language, 'auth.codeSentSuccessfully') };
      },
    ),
    verifyCode: async (
      _: unknown,
      { data: { code, mobile }, language }: MutationVerifyCodeArgs,
      { db, req }: ContextType,
    ) => {
      let user;
      user = await db.client.findUnique({
        where: { mobile },
      });
      if (!user) {
        throw new Error(formatMessage(language, 'common.unknownError'));
      }

      const { verificationCode } = user;

      if (code !== verificationCode) {
        throw new Error(formatMessage(language, 'auth.wrongCode'));
      }
      await db.client.update({
        where: { mobile },
        data: { isVerified: true },
      });
      return { message: formatMessage(language, 'auth.mobileVerifiedSuccessfully') };
    },
    resendVerificationCode: async (_: unknown, { data, language }: MutationClientSignUpArgs, { db }: ContextType) => {
      const { mobile, androidSignature } = data;

      let user;
      user = await db.client.findUnique({
        where: { mobile },
      });

      if (!user) {
        throw new Error('user not found');
      }

      let { verificationCode } = user;

      if (!verificationCode) {
        verificationCode = generateRandomNumber(4).toString();
      }

      try {
        await smsSendNando(mobile, +verificationCode, androidSignature);
      } catch (error) {
        trackError(error);
        throw new Error(formatMessage('EN', 'auth.codeNotSent'));
      }

      await db.client.update({
        where: { mobile },
        data: { verificationCode: verificationCode.toString() },
      });

      return { message: formatMessage('EN', 'auth.resendCode') };
    },
    clientSignUp: async (_: unknown, { data, language }: MutationClientSignUpArgs, { db }: ContextType) => {
      const { mobile, androidSignature, ...clientData } = data || {};
      const user = await db.client.findUnique({
        where: { mobile },
      });
      if (user?.password) {
        throw new Error(formatMessage(language, 'auth.mobileAlreadyExists'));
      } else {
        const code = generateRandomNumber(4);
        try {
          await sendSMS(mobile, code, androidSignature);
        } catch (error) {
          trackError(error);
          throw new Error(formatMessage(language, 'auth.codeNotSent'));
        }

        const hashedPassword = clientData.password ? await bcrypt.hash(clientData.password, 10) : '';

        let client;
        if (user) {
          client = await db.client.update({
            where: { mobile },
            data: {
              verificationCode: code.toString(),
              ...(hashedPassword && { password: hashedPassword }),
            },
          });
        } else {
          client = await db.client.create({
            data: {
              ...clientData,
              mobile,
              ...(data?.email && { email: normalizeEmail(data.email) }),
              isVerified: false,
              verificationCode: code.toString(),
              ...(hashedPassword && { password: hashedPassword }),
            },
          });
          sendSlackNotification(
            `Created a new user - https://crm.wolly.ge/lients/${client.id}`,
            'https://hooks.slack.com/services/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',
          );
        }

        if (!client) {
          throw new Error(formatMessage(language, 'common.unknownError'));
        }
        const token = jwt.sign({ userId: client.id, authType: 'client' }, process.env.APP_SECRET);
        return { user: transformUser(client), token };
      }
    },
    signin: async (_: unknown, { data, language }: MutationSigninArgs, { db, res }: ContextType) => {
      // @ts-ignore
      const { email, password, authType, mobile, pushToken } = data;

      // @ts-ignore
      const user = await db[authType].findUnique({
        where: {
          ...(email ? { email } : { mobile }),
        },
      });

      if (!user) {
        throw new Error(formatMessage(language, 'auth.wrongMobileNumber'));
      }

      if (authType === AuthType.Client && pushToken && mobile) {
        await db[authType].update({
          where: { mobile },
          data: { pushToken },
        });
      }

      if (!user.password) {
        throw new Error(formatMessage(language, 'auth.mobileNotFound', { mobile }));
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error(formatMessage(language, 'auth.wrongPassword'));
      }

      const token = jwt.sign({ userId: user.id, authType }, process.env.APP_SECRET);

      user.token = token;
      if (res) {
        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          maxAge: CONFIG.maxAge,
        });
      }
      return {
        user: transformUser(user),
        token,
      };
    },
    // @ts-ignore
    signinCrm: combineResolvers(validateInput, async (_, { data, language }, { db, res }: ContextType) => {
      const { email, password, authType, mobile } = data;
      const user = await db.user.findUnique({
        where: {
          ...(email ? { email } : { mobile }),
        },
      });
      if (!user) {
        throw new Error(formatMessage(language, 'auth.wrongMobileNumber'));
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error(formatMessage(language, 'auth.wrongPassword'));
      }
      const token = jwt.sign({ userId: user.id, authType }, process.env.APP_SECRET);
      // @ts-ignore
      user.token = token;
      if (res) {
        res.cookie('authorization', token, {
          httpOnly: true,
          secure: true,
          maxAge: CONFIG.maxAge,
        });
      }
      return { user: transformUser(user), token };
    }),
    // @ts-ignore
    async signout(_, _args, { res, req, db }: ContextType) {
      if (req.userId) {
        await db.client.update({
          where: { id: req.userId },
          data: { pushToken: null },
        });
      }

      if (res) {
        res.clearCookie('token');
      }

      return { message: 'GoodBye!' };
    },
    // @ts-ignore
    async resetPassword(_, { data, language }, { db, res }: ContextType) {
      const { mobile, password, email, authType, verificationCode } = data;
      // @ts-ignore
      const user = await db[authType].findUnique({
        where: {
          ...(email ? { email } : { mobile }),
        },
      });

      if (!user || user.verificationCode !== verificationCode) {
        throw new Error(formatMessage(language, 'common.unknownError'));
      }
      const newPassword = await bcrypt.hash(password, 10);
      // @ts-ignore
      const updatedUser = await db[authType].update({
        where: { id: user.id },
        data: {
          password: newPassword,
          verificationCode: '',
        },
      });
      const token = jwt.sign({ userId: updatedUser.id, authType }, process.env.APP_SECRET);
      user.token = token;
      if (res) {
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: CONFIG.maxAge,
        });
      }
      return transformUser(user);
    },
    changeMyPassword: combineResolvers(
      isAuthenticated,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data },
        { db, req: { userId, language } }: ContextType,
      ) => {
        const { newPassword, currentPassword, authType } = data;
        // @ts-ignore
        const user = await db[authType].findUnique({
          where: { id: userId },
        });

        const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordsMatch) {
          throw new Error(formatMessage(language, 'auth.wrongCurrentPassword'));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // @ts-ignore
        await db[authType].update({
          where: { id: userId },
          data: {
            password: hashedPassword,
            updatedAt: new Date().toISOString(),
          },
        });
        return { message: formatMessage(language, 'auth.passwordChangedSuccessfully') };
      },
    ),
    updateMyMobile: combineResolvers(
      isAuthenticated,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data: { authType, verificationCode, mobile } },
        { db, req: { userId, language } }: ContextType,
      ) => {
        // @ts-ignore
        const user = await db[authType].findUnique({
          where: { id: userId },
        });

        if (verificationCode !== user.verificationCode) {
          throw new Error(formatMessage(language, 'auth.wrongCode'));
        }
        // @ts-ignore
        const userExists = await db[authType].findUnique({
          where: { mobile },
        });
        if (userExists) {
          throw new Error(formatMessage(language, 'auth.mobileAlreadyExists'));
        }
        // @ts-ignore
        await db[authType].update({
          where: { id: userId },
          data: { mobile, verificationCode: '' },
        });

        return { message: formatMessage(language, 'common.updatedSuccessfully') };
      },
    ),
    updateMyProfile: async (
      _: unknown,
      { data: { verificationCode, password, ...profileData } }: MutationUpdateMyProfileArgs,
      { db, req: { userId, language, meClient } }: ContextType,
    ) => {
      let token;
      let updatedMyProfile;

      const updateData = {
        verificationCode: '',
        ...(profileData.mobile && { mobile: profileData.mobile }),
        ...(profileData.photo && { photo: profileData.photo }),
        ...(profileData.firstName && { firstName: profileData.firstName }),
        ...(profileData.lastName && { lastName: profileData.lastName }),
        ...(profileData.language && { language: profileData.language }),
        ...(profileData.smsEnabled != null && { smsEnabled: !!profileData.smsEnabled }),
        ...(profileData.notificationsEnabled != null && { notificationsEnabled: !!profileData.notificationsEnabled }),
      };

      if (verificationCode && verificationCode !== meClient.verificationCode) {
        throw new Error(formatMessage(language, 'auth.wrongCode'));
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        token = jwt.sign({ userId: meClient.id }, process.env.APP_SECRET);
        updatedMyProfile = await db.client.update({
          where: { id: userId },
          data: {
            ...updateData,
            password: hashedPassword,
          },
        });
      } else {
        updatedMyProfile = await db.client.update({
          where: { id: userId },
          data: { ...updateData, isVerified: true },
        });
      }
      return {
        user: transformUser(updatedMyProfile),
        token,
      };
    },
  },
};

import cron from 'node-cron';
import prisma from '../services/db';
import sendSMS from '../services/sms';

export const startOrderNotifications = () => {
  let task = cron.schedule('0 */2 * * *', async () => {
    let now = new Date();
    let offset = now.getTimezoneOffset() * 60 * 1000;
    let localTime = new Date(now.getTime() - offset);
    let localTimePlusTwelveHours = new Date(localTime.getTime() + 12 * 60 * 60 * 1000).toISOString();

    console.log({localTimePlusTwelveHours});

    try {
      const upcomingDeliveries = await prisma.order.findMany({
        where: {
          startTime: {
            lt: localTimePlusTwelveHours
        },
          preOrderNotification: false,
        },
      });

      console.log({upcomingDeliveries})

      for (let order of upcomingDeliveries) {
        const orderLink = `https://crm.wolly.ge/orders/${order.id}`;

        await sendSMS('571192240', `შეკვეთის დაწყებამდე დარჩენილია 12 საათი!, ლინკი ორდერზე: ${orderLink}`, '');
        await sendSMS('551215621', `შეკვეთის დაწყებამდე დარჩენილია 12 საათი!, ლინკი ორდერზე: ${orderLink}`, '');

        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            preOrderNotification: true,
          },
        });
      }
    } catch (e) {
      console.log('error while sending cron: ', e);
    }
  });
  task.start();
};

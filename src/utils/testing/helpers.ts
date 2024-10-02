import { Language, PaymentMethod, PaymentStatus, ServiceType, Speciality, ToolType } from '@prisma/client';
import { UserRole } from '../../modules/user/types';
import db from '../../services/db';

export const dbRecordsInitializer = async () => {
  try {
    const country = await db.country.create({ data: { name: 'Georgia', code: 'ge' } });
    const city = await db.city.create({ data: { country: { connect: { code: country.code } }, name: 'Tbilisi' } });
    const client = await db.client.create({ data: { language: 'KA', mobile: '595008090' } });
    await db.client.create({
      data: { language: 'KA', mobile: '502592192', email: 'testClientmail@gmail.com' },
    });
    const address = await db.address.create({
      data: {
        city: {
          connect: {
            id: city.id,
          },
        },
        street: 'Mtsketa str.',
        details: 'norm adgilia',
        latitude: 11,
        longitude: 12,
        client: {
          connect: {
            id: client.id,
          },
        },
      },
    });
    const userAddress = await db.address.create({
      data: {
        city: {
          connect: {
            id: city.id,
          },
        },
        street: 'Mtsketa str.',
        details: 'norm adgilia',
        latitude: 11,
        longitude: 12,
        client: {
          connect: {
            id: client.id,
          },
        },
      },
    });
    const employee = await db.employee.create({
      data: {
        firstName: 'First',
        lastName: 'Employee',
        email: 'firstEmployee@gmail.com',
        mobile: '501100999',
        speakingLanguages: {
          set: Language.KA,
        },
        specialities: {
          set: Speciality.GENERAL_CLEANER,
        },
        password: 'Chalagashvili1@',
        emergencyContact: '509210982',
        salary: 200,
        isAvailable: false,
        address: { connect: { id: address.id } },
        photo:
          'https://imaaages.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        isTeamLead: false,
      },
    });
    await db.workingDayAndHour.create({
      data: {
        startWeekday: 1,
        endWeekday: 5,
        startTime: '19:00',
        endTime: '18:00',
        employee: {
          connect: { id: employee.id },
        },
      },
    });
    const tool = await db.tool.create({
      data: {
        name: 'First Tool',
        description: 'Steam cleaner!!',
        toolType: ToolType.VACUUM_CLEANER,
      },
    });
    // const order = await db.order.create({
    //   data: {
    //     status: 'NEW',
    //     comment: 'komentari',
    //     startTime: '2020-12-08T11:00:00.000Z',
    //     endTime: '2020-12-09T15:00:00.000Z',
    //     paymentMethod: PaymentMethod.CASH,
    //     paymentStatus: PaymentStatus.UNPAID,
    //     price: 20,
    //     duration: 150,
    //     // petExists: true,
    //     serviceType: ServiceType.AFTER_RENOVATION,
    //     // bedroom: 1,
    //     // bathroom: 2,
    //     // cabinet: 0,
    //     // studio: 1,
    //     // livingRoom: 2,
    //     // kitchen: 1,
    //     // area: 200,
    //     // client: { connect: { id: client.id } },
    //     // address: {
    //     //   connect: { id: address.id },
    //     // },
    //     // assignedEmployees: {
    //     //   connect: { id: employee.id },
    //     // },
    //     // assignedTools: {
    //     //   connect: { id: tool.id },
    //     // },
    //   },
    // });
    // await db.employeeReview.create({
    //   data: {
    //     personnelRating: 3,
    //     serviceRating: 3,
    //     comment: 'Good Job!',
    //     order: { connect: { id: order.id } },
    //     employee: { connect: { id: employee.id } },
    //   },
    // });
    // await db.clientReview.create({
    //   data: {
    //     rating: 3,
    //     comment: 'Good Job!',
    //     order: { connect: { id: order.id } },
    //     client: { connect: { id: client.id } },
    //   },
    // });
    // await db.busyTime.create({
    //   data: {
    //     employee: { connect: { id: employee.id } },
    //     unavailableTo: '2020-12-08T11:00:00.000Z',
    //     unavailableFrom: '2020-12-08T11:00:00.000Z',
    //     busyFrom: '2020-12-08T11:00:00.000Z',
    //     busyTo: '2020-12-08T11:00:00.000Z',
    //     daysInMonth: 10,
    //   },
    // });
    // await db.user.create({
    //   data: {
    //     firstName: 'Sandro',
    //     lastName: 'Admin',
    //     mobile: `590000000`,
    //     password: 'myPassword1',
    //     email: `init@gmaill.com`,
    //     role: UserRole.ADMIN,
    //     address: { connect: { id: userAddress.id } },
    //   },
    // });
    // await db.user.create({
    //   data: {
    //     firstName: 'Sandr2o',
    //     lastName: 'Admin',
    //     mobile: `591000000`,
    //     password: 'myPassword1',
    //     email: `init22@gmaill.com`,
    //     role: UserRole.MANAGER,
    //     address: { connect: { id: userAddress.id } },
    //   },
    // });
  } catch (error) {}
};

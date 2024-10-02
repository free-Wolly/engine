import { generateFreeSlots } from './helpers';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import { formatError } from '../../utils';

describe('Slots', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async () => {
      // const users = await db.user.findMany();

      return { req: { userId: 'user.id', me: { language: 'KA' } }, db };
    },
  });
  // @ts-ignore
  const { query } = createTestClient(server);

  it('Get Available Slots', async () => {
    const GET_SLOTS = gql`
      query GetSlots(
        $start: String!
        $end: String!
        $specialities: [SpecialityDetail!]!
        $equipment: [ToolDetail]
        $speakingLanguage: Language
      ) {
        getSlots(
          data: {
            start: $start
            end: $end
            specialities: $specialities
            equipment: $equipment
            speakingLanguage: $speakingLanguage
          }
        ) {
          availableSlots
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({
      query: GET_SLOTS,
      variables: {
        start: '2021-01-27T13:00:00.000Z',
        end: '2021-01-27T14:00:00.000Z',
        speakingLanguage: 'KA',
        specialities: [
          {
            speciality: 'GENERAL_CLEANER',
            quantity: 1,
          },
        ],
        equipment: [
          {
            toolType: 'VACUUM_CLEANER',
            quantity: 1,
          },
        ],
      },
    });
  });
});

test('should generate free slots', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T15:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-01-24T08:00:00.000Z',
          busyFrom: '10:00',
          busyTo: '14:00',
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          daysInMonth: 2,
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
    {
      id: 'ckkil6shh0014psaeli4m7nxl222',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T06:00:00.000Z',
          busyTo: '2020-11-24T07:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T12:00:00.000Z'));
});

test('should generate free slots NN1', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T15:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T15:00:00.000Z'));
});

test('should generate free slots NNN2', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T15:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T17:00:00.000Z',
          busyTo: '2020-11-24T19:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T09:00:00.000Z',
    end: '2020-11-24T18:00:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T09:00:00.000Z'));
});

test('should generate free slots with two cleaners with different speciality', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:30:00.000Z',
          busyTo: '2020-11-24T15:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
    {
      id: 'ckkil6shh0014psaeli4m7nxl222',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T06:00:00.000Z',
          busyTo: '2020-11-24T07:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T12:00:00.000Z',
          busyTo: '2020-11-24T13:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });
  expect(slots[0].pickedEmployees).toHaveLength(2);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T13:00:00.000Z'));
});

test('should generate free slots with two cleaners with the same speciality', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T15:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
    {
      id: 'ckkil6shh0014psaeli4m7nxl222',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '11:00',
          startDayOfWeek: 4,
          busyTo: '16:00',
          endDayOfWeek: 4,
          daysInMonth: 2,
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 2,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(2);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T16:00:00.000Z'));
});

test('should generate free slots with three cleaners', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T15:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
    {
      id: 'ckkil6shh0014psaeli4m7nxl222',
      specialities: ['GENERAL_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T06:00:00.000Z',
          busyTo: '2020-11-24T07:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
    {
      id: 'ckkil6shh0014psaeli4m7nxl333',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T06:00:00.000Z',
          busyTo: '2020-11-24T07:00:00.000Z',
        },
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '20:00',
          startDayOfWeek: 4,
          busyTo: '02:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 2,
      },
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(3);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T09:00:00.000Z'));
});

test('should generate free slots N2', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T06:00:00.000Z',
          busyTo: '2020-11-24T07:00:00.000Z',
        },
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 60,
    specialities: [
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T12:00:00.000Z'));
});

test('should generate free slots Tool N1', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: '2020-11-24T23:59:00.000Z',
    duration: 180,
    specialities: [
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(1);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T12:00:00.000Z'));
});

test('should generate free slots with the same two Tool N2', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g22',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 2,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(2);
  expect(new Date(slots[0].start)).toEqual('2020-11-24T08:00:00.000Z');
});

test('should generate free slots with two different Tool N3', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g22',
      toolType: 'STEAM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
      {
        toolType: 'STEAM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(2);
  expect(new Date(slots[0].start)).toEqual('2020-11-24T08:00:00.000Z');
});

test('should generate free slots with two Tool N4', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g22',
      toolType: 'STEAM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T15:00:00.000Z'),
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
      {
        toolType: 'STEAM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(2);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T15:00:00.000Z'));
});

test('should generate free slots with three Tools N5', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T10:00:00.000Z',
          busyTo: '2020-11-24T11:00:00.000Z',
        },
      ],
    },
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g122',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T13:00:00.000Z',
        },
      ],
    },
    {
      id: '33321321321',
      toolType: 'STEAM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T09:00:00.000Z',
          busyTo: '2020-11-24T14:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'WINDOW_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 2,
      },
      {
        toolType: 'STEAM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots[0].pickedEmployees).toHaveLength(1);
  expect(slots[0].pickedEquipment).toHaveLength(3);
  expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T14:00:00.000Z'));
});

// test('should generate free slots N3', () => {
//   const personnel = [
//     {
//       id: 'ckkil6shh0014psaeli4m7nxl',
//       specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
//       isAvailable: true,
//       speakingLanguages: ['en', 'ka'],
//       workingDaysAndHours: [
//         {
//           startDayOfWeek: 1,
//           endDayOfWeek: 1,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//         {
//           startDayOfWeek: 2,
//           endDayOfWeek: 2,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//         {
//           startDayOfWeek: 4,
//           endDayOfWeek: 4,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//         {
//           startDayOfWeek: 5,
//           endDayOfWeek: 5,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//       ],
//       busyTimes: [
//         {
// contractStartDate: '2020-11-24T08:00:00.000Z',
// contractEndDate: '2021-11-24T08:00:00.000Z',
// busyFrom: '20:00',
// startDayOfWeek: 4,
// busyTo: '02:00',
// endDayOfWeek: 5,
// daysInMonth: 2,
//
//         },
//       ],
//     },
//   ];
//   const tools = [
//     {
//       id: 'ckkiljgvt0004uzaeps4b1m3g',
//       toolType: 'VACUUM_CLEANER',
//       isAvailable: true,
//       busyTimes: [
//         {
//           busyFrom: '2020-11-24T11:00:00.000Z',
//           busyTo: '2020-11-24T12:00:00.000Z',
//         },
//       ],
//     },
//   ];
//   const slots = generateFreeSlots({
//    employees: personnel,
//     tools,

//       {
//         speciality: 'GENERAL_CLEANER',
//         quantity: 1,
//       },
//     ],
//  equipment:   [
//       {
//         toolType: 'VACUUM_CLEANER',
//         quantity: 1,
//       },
//     ],
//
//   );

// expect(slots[0].pickedEmployees).toHaveLength(3);
// expect(slots[0].pickedEquipment).toHaveLength(1);
// expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T09:00:00.000Z'));
// });

// test('should generate free slots N4', () => {
//   const personnel = [
//     {
//       id: 'ckkil6shh0014psaeli4m7nxl',
//       specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
//       isAvailable: true,
//       speakingLanguages: ['en', 'ka'],
//       workingDaysAndHours: [
//         {
//           startDayOfWeek: 1,
//           endDayOfWeek: 1,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//         {
//           startDayOfWeek: 2,
//           endDayOfWeek: 2,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//         {
//           startDayOfWeek: 4,
//           endDayOfWeek: 4,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//         {
//           startDayOfWeek: 5,
//           endDayOfWeek: 5,
//           startTime: '09:00',
//           endTime: '18:00',
//         },
//       ],
//       busyTimes: [
//         {
//           unavailableFrom: '2020-11-25T08:00:00.000Z',
//           unavailableTo: '2020-11-28T08:00:00.000Z',
//         },
//       ],
//     },
//   ];
//   const tools = [
//     {
//       id: 'ckkiljgvt0004uzaeps4b1m3g',
//       toolType: 'VACUUM_CLEANER',
//       isAvailable: true,
//       busyTimes: [
//         {
//           busyFrom: '2020-11-24T11:00:00.000Z',
//           busyTo: '2020-11-24T12:00:00.000Z',
//         },
//       ],
//     },
//   ];
//   const slots = generateFreeSlots({
//    employees: personnel,
//     tools,
//       {
//         speciality: 'GENERAL_CLEANER',
//         quantity: 1,
//       },
//     ],
//  equipment:   [
//       {
//         toolType: 'VACUUM_CLEANER',
//         quantity: 1,
//       },
//     ],
//
//   );

// expect(slots[0].pickedEmployees).toHaveLength(3);
// expect(slots[0].pickedEquipment).toHaveLength(1);
// expect(new Date(slots[0].start)).toEqual(new Date('2020-11-24T09:00:00.000Z'));
// });

test('should Not generate free slots because isAvailable is false', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: false,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

test('should Not generate free slots because required speciality is missing', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['WINDOW_CLEANER'],
      isAvailable: false,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

test('should Not generate free slots because required language is missing', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['WINDOW_CLEANER'],
      isAvailable: false,
      speakingLanguages: ['ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          unavailableFrom: '2020-11-25T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

// test('should NOT generate free slots because job time is out of workingDaysAndHours', () => {
//   const personnel = [
//     {
//       id: 'ckkil6shh0014psaeli4m7nxl',
//       specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
//       isAvailable: true,
//       speakingLanguages: ['en', 'ka'],
//       workingDaysAndHours: [
//         {
//           startDayOfWeek: 1,
//           endDayOfWeek: 1,
//           startTime: '04:00',
//           endTime: '08:00',
//         },
//         {
//           startDayOfWeek: 2,
//           endDayOfWeek: 2,
//           startTime: '04:00',
//           endTime: '08:00',
//         },
//         {
//           startDayOfWeek: 4,
//           endDayOfWeek: 4,
//           startTime: '04:00',
//           endTime: '08:00',
//         },
//         {
//           startDayOfWeek: 5,
//           endDayOfWeek: 5,
//           startTime: '04:00',
//           endTime: '08:00',
//         },
//       ],
//       busyTimes: [
//         {
//           unavailableFrom: '2020-11-25T08:00:00.000Z',
//           unavailableTo: '2020-11-28T08:00:00.000Z',
//         },
//       ],
//     },
//   ];
//   const tools = [
//     {
//       id: 'ckkiljgvt0004uzaeps4b1m3g',
//       toolType: 'VACUUM_CLEANER',
//       isAvailable: true,
//       busyTimes: [
//         {
//           busyFrom: '2020-11-24T11:00:00.000Z',
//           busyTo: '2020-11-24T12:00:00.000Z',
//         },
//       ],
//     },
//   ];
//   const slots = generateFreeSlots({
//    employees: personnel,
//     tools,

//     60,
//     [
duration: //       {
//         speciality: 'GENERAL_CLEANER',
//         quantity: 1,
//       },
//     ],
//  equipment:   [
//       {
//         toolType: 'VACUUM_CLEANER',
//         quantity: 1,
//       },
//     ],
//
//   );

//   expect(slots).toHaveLength(0);
// });

specialities: test('should NOT generate slots because employee is unavailable at that time', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          unavailableFrom: '2020-11-22T08:00:00.000Z',
          unavailableTo: '2020-11-28T08:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});
test('should NOT generate slots because of recurrent job', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          contractStartDate: '2020-11-24T08:00:00.000Z',
          contractEndDate: '2021-11-24T08:00:00.000Z',
          busyFrom: '08:00',
          startDayOfWeek: 4,
          busyTo: '23:00',
          endDayOfWeek: 5,
          daysInMonth: 2,
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });
  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because of recurrent busy time', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T09:00:00.000Z',
          busyTo: '2020-11-24T18:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: new Date('2020-11-18:00:00.000Z'),
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because of busy time(duration 7hours)', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T11:00:00.000Z'),
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 420,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because not enough quantity of personnel', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 2,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because not enough quantity of tools', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 2,
      },
    ],
  });
  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because Tool is not available', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: false,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });
  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because required Tool is not available', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'STEAM_CLEANER',
        quantity: 1,
      },
    ],
  });
  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because of busy times', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T08:00:00.000Z',
          busyTo: '2020-11-24T23:59:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: '2020-11-24T08:00:00.000Z',
    end: '2020-11-24T23:59:00.000Z',
    duration: 60,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'STEAM_CLEANER',
        quantity: 1,
      },
    ],
  });
  expect(slots).toHaveLength(0);
});

test('should NOT generate slots because of tool busy time(duration 7hours)', () => {
  const personnel = [
    {
      id: 'ckkil6shh0014psaeli4m7nxl',
      specialities: ['GENERAL_CLEANER', 'WINDOW_CLEANER'],
      isAvailable: true,
      speakingLanguages: ['en', 'ka'],
      workingDaysAndHours: [
        {
          startDayOfWeek: 1,
          endDayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 2,
          endDayOfWeek: 2,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 4,
          endDayOfWeek: 4,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          startDayOfWeek: 5,
          endDayOfWeek: 5,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      busyTimes: [],
    },
  ];
  const tools = [
    {
      id: 'ckkiljgvt0004uzaeps4b1m3g',
      toolType: 'VACUUM_CLEANER',
      isAvailable: true,
      busyTimes: [
        {
          busyFrom: '2020-11-24T11:00:00.000Z',
          busyTo: '2020-11-24T12:00:00.000Z',
        },
      ],
    },
  ];
  const slots = generateFreeSlots({
    employees: personnel,
    tools,
    start: new Date('2020-11-24T09:00:00.000Z'),
    end: new Date('2020-11-24T18:00:00.000Z'),
    duration: 420,
    specialities: [
      {
        speciality: 'GENERAL_CLEANER',
        quantity: 1,
      },
    ],
    equipment: [
      {
        toolType: 'VACUUM_CLEANER',
        quantity: 1,
      },
    ],
  });

  expect(slots).toHaveLength(0);
});

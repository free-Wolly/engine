// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, validateInput, generateSearchQuery } from '../../utils';
import formatMessage from '../../localization/intl';
import { ContextType } from '../../services/createServer';
import { trackError } from '../../services/sentry';

export default {
  Query: {
    // @ts-ignore
    getWorkingDayAndHour: combineResolvers(isManager, async (_, { id }, { db }: ContextType) =>
      db.workingDayAndHour.findUnique({ where: { id } }),
    ),
    // @ts-ignore
    getAllWorkingDaysAndHours: combineResolvers(isManager, async (_, args, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      return db.workingDayAndHour.findMany({
        skip,
        take,
        include: { employee: true },
        where: {
          ...whereQuery,
        },
        ...sortQuery,
      });
    }),
  },
  Mutation: {
    createWorkingDayAndHour: combineResolvers(
      isManager,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data: { workingDaysAndHours, employeeId } },
        { db, req: { language } }: ContextType,
      ) => {
        try {
          // @ts-ignore
          workingDaysAndHours.forEach(async workingDayAndHour => {
            await db.workingDayAndHour.create({
              data: {
                ...workingDayAndHour,
                employee: {
                  connect: { id: employeeId },
                },
              },
            });
          });
          return { message: formatMessage(language, 'common.createSuccessfully') };
        } catch (error) {
          trackError(error);
          throw new Error(formatMessage(language, 'common.unknownError'));
        }
      },
    ),
    updateWorkingDayAndHour: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data: { employeeId, workingDaysAndHours } },
        { db, req: { language } }: ContextType,
      ) => {
        await db.workingDayAndHour.deleteMany({ where: { employeeId } });
        // @ts-ignore
        workingDaysAndHours.forEach(async workingDayAndHour => {
          await db.workingDayAndHour.create({
            data: {
              ...workingDayAndHour,
              employee: {
                connect: { id: employeeId },
              },
            },
          });
        });

        return { message: formatMessage(language, 'common.updatedSuccessfully') };
      },
    ),
    deleteWorkingDayAndHour: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language } }: ContextType,
      ) => {
        await db.workingDayAndHour.delete({ where: { id } });
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
  WorkingDayAndHour: {
    // @ts-ignore
    employee: async ({ employeeId }, _args, { db }) => db.employee.findUnique({ where: { id: employeeId } }),
  },
};

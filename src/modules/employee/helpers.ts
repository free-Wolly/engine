import moment from 'moment';


// @ts-ignore
export const findAvailableEmployees = async (db, fromDateTime, toDateTime, specialities) => {
  const start = moment(fromDateTime);
  const end = moment(toDateTime);
  const startDay = start.isoWeekday();
  const startTime = `1970-01-01 ${start.format('HH:mm')}`;
  const endDay = end.isoWeekday();
  const endTime = `1970-01-01 ${end.format('HH:mm')}`;
  // Find employees that work during given time
  const personnel = await db.employee.findMany({
    where: {
      workingDaysAndHours: {
        some: {
          startDay: {
            lte: startDay,
          },
          endDay: {
            gte: endDay,
          },
          startTime: {
            lte: startTime,
          },
          endTime: {
            gte: endTime, // @TODO minutes -duration
          },
        },
      },
      isAvailable: {
        equals: true,
      },
      specialities: { some: { id: { in: specialities } } },
    },
    include: { specialities: true, busyTimes: true },
  });
  return personnel;
};

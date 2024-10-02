import { PrismaClient } from '@prisma/client';

// @ts-ignore
export const findAvailableTools = async (db: PrismaClient<{}, never>, tools) => {
  // Find equipment that is available
  return db.tool.findMany({
    where: {
      toolType: { in: tools },
      isAvailable: {
        equals: true,
      },
    },
    include: { busyTimes: true },
  });
};

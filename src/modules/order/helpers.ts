// @ts-ignore
export const createOrderBusyTimes = async ({ db, ids, connectTo, busyFrom, busyTo, orderId }) => {
  // const results = [];
  for (const id of ids) {
    await db.busyTime.create({
      data: {
        busyFrom,
        busyTo,
        assignedOrderId: orderId,
        [connectTo]: {
          connect: {
            id,
          },
        },
      },
    });
  }
  return true;
};

// @ts-ignore
export const cleanupOrderBusyTimes = async ({ assignedOrderId, db }) => {
  const deleted = await db.busyTime.delete({
    where: {
      assignedOrderId,
    },
  });
  return deleted;
};

// @ts-ignore
export const checkIfOrderHasNotFinished = async (orderId) => { };

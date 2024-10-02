import { Order } from '@prisma/client';

const calculateDailyValues = (orders: Order[], calculateValue: (order: Order) => number, valueKey: string) => {
  let result = orders.reduce((sum, current) => {
    const dateObject = current.startTime;
    const dateString = dateObject.toISOString();
    const dateOnly = dateString.substring(0, 10);
    if (sum[dateOnly]) {
      sum[dateOnly] = sum[dateOnly] + calculateValue(current);
    } else {
      sum[dateOnly] = calculateValue(current);
    }
    return sum;
  }, {});

  let finalResult = Object.keys(result).map(date => {
    return {
      date: date,
      [valueKey]: result[date],
    };
  });

  return finalResult;
};

export const ravenueFormater = (orders: Order[]) => {
  return calculateDailyValues(orders, order => order.price, 'revenue');
};

export const profitFormater = (orders: Order[]) => {
  return calculateDailyValues(orders, order => order.price - (order.expense || 0), 'profit');
};

export const expenseFormater = (orders: Order[]) => {
  return calculateDailyValues(orders, order => order.expense || 0, 'expense');
};

export const orderChartFormater = (orders: Order[]) => {
  return calculateDailyValues(orders, order => 1, 'order');
};

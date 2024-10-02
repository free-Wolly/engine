import { GraphQLJSON } from 'graphql-type-json';

import { authResolver } from './modules/auth';
import { userResolver } from './modules/user';
import { countryResolver } from './modules/country';
import { alertResolver } from './modules/alert';
import { cityResolver } from './modules/city';
import { toolResolver } from './modules/tool';
import { clientResolver } from './modules/client';
import { employeeResolver } from './modules/employee';
import { busyTimeResolver } from './modules/busyTime';
import { workingDayAndHourResolver } from './modules/workingDayAndHour';
import { slotResolver } from './modules/availableTimeSlots';
import { addressResolver } from './modules/address';
import { orderResolver } from './modules/order';
import { clientReviewResolver } from './modules/clientReview';
import { cleaningProductResolver } from './modules/cleaningProduct';
import { dailyOrderLimitResolver } from './modules/dailyOrderLimit';
import { paymentResolver } from './modules/payments/tbc/';
import { liveChatResolver } from './modules/liveChat';
import { orderReviewResolver } from './modules/orderReview';
import { chartResolver } from './modules/chart';
import { expenseResolver } from './modules/expenses';
import { documentResolver } from './modules/document';

const customJSONResolver = {
  JSON: GraphQLJSON,
  UserObjectResponse: {
    // @ts-ignore
    __resolveType(obj) {
      if (Object.prototype.hasOwnProperty.call(obj, 'isVerified')) {
        return 'Client';
      }
      if (Object.prototype.hasOwnProperty.call(obj, 'isAvailable')) {
        return 'Employee';
      }
      if (Object.prototype.hasOwnProperty.call(obj, 'role')) {
        return 'User';
      }
      return null;
    },
  },
};

export default [
  customJSONResolver,
  authResolver,
  userResolver,
  countryResolver,
  alertResolver,
  cityResolver,
  toolResolver,
  clientResolver,
  employeeResolver,
  workingDayAndHourResolver,
  slotResolver,
  addressResolver,
  orderResolver,
  clientReviewResolver,
  busyTimeResolver,
  cleaningProductResolver,
  dailyOrderLimitResolver,
  paymentResolver,
  liveChatResolver,
  orderReviewResolver,
  chartResolver,
  expenseResolver,
  documentResolver,
];

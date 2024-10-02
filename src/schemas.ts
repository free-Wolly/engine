import { gql } from 'apollo-server-express';
import { authSchema } from './modules/auth';
import { userSchema } from './modules/user';
import { alertSchema } from './modules/alert';
import { citySchema } from './modules/city';
import { countrySchema } from './modules/country';
import { employeeSchema } from './modules/employee';
import { clientSchema } from './modules/client';
import { orderSchema } from './modules/order';
import { slotSchema } from './modules/availableTimeSlots';
import { toolSchema } from './modules/tool';
import { busyTimeSchema } from './modules/busyTime';
import { workingDayAndHourSchema } from './modules/workingDayAndHour';
import { addressSchema } from './modules/address';
import { clientReviewSchema } from './modules/clientReview';
import commonSchema from './modules/common';
import { cleaningProductSchema } from './modules/cleaningProduct';
import { dailyOrderLimitSchema } from './modules/dailyOrderLimit';
import { paymentSchema } from './modules/payments/tbc';
import { liveChatSchema } from './modules/liveChat';
import { orderReviewSchema } from './modules/orderReview';
import { chartSchema } from './modules/chart';
import { expenseSchema } from './modules/expenses';
import { documentSchema } from './modules/document';

const linkSchema = gql`
  scalar JSON
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  authSchema,
  userSchema,
  alertSchema,
  citySchema,
  commonSchema,
  countrySchema,
  employeeSchema,
  clientSchema,
  orderSchema,
  slotSchema,
  toolSchema,
  busyTimeSchema,
  workingDayAndHourSchema,
  addressSchema,
  clientReviewSchema,
  cleaningProductSchema,
  dailyOrderLimitSchema,
  paymentSchema,
  liveChatSchema,
  orderReviewSchema,
  chartSchema,
  expenseSchema,
  documentSchema,
];

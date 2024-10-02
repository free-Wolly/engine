import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Address as AddressModel, City as CityModel } from '@prisma/client/index.d';
import { IPrismaContext } from 'prisma/IPrismaContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Address = {
  __typename?: 'Address';
  apartment?: Maybe<Scalars['String']>;
  city: ApolloCity;
  cityId: Scalars['String'];
  client?: Maybe<Client>;
  createdAt: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
  employee?: Maybe<Employee>;
  entrance?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  street: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
};

export type Alert = {
  __typename?: 'Alert';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  message: Scalars['String'];
  orderId: Scalars['String'];
  seen: Scalars['Boolean'];
  type: AlertType;
  updatedAt: Scalars['String'];
};

export enum AlertType {
  Emergency = 'EMERGENCY',
  Order = 'ORDER',
  Other = 'OTHER'
}

export type Amount = {
  currency: Scalars['String'];
  shipping?: InputMaybe<Scalars['Float']>;
  subtotal?: InputMaybe<Scalars['Float']>;
  tax?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
};

export type ApartmentCleaning = {
  __typename?: 'ApartmentCleaning';
  area?: Maybe<Scalars['Int']>;
  balconyArea?: Maybe<Scalars['Int']>;
  bathroom?: Maybe<Scalars['Int']>;
  bedroom?: Maybe<Scalars['Int']>;
  cabinet?: Maybe<Scalars['Int']>;
  clothesWashing?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  curtains?: Maybe<Scalars['Int']>;
  fridge?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  kitchen?: Maybe<Scalars['Int']>;
  kitchenInside?: Maybe<Scalars['Boolean']>;
  livingRoom?: Maybe<Scalars['Int']>;
  oven?: Maybe<Scalars['Boolean']>;
  petExists?: Maybe<Scalars['Boolean']>;
  premiumLiquids?: Maybe<Scalars['Boolean']>;
  studio?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
  wardrobe?: Maybe<Scalars['Boolean']>;
};

export type ApartmentCleaningInput = {
  area?: InputMaybe<Scalars['Int']>;
  balconyArea?: InputMaybe<Scalars['Int']>;
  bathroom?: InputMaybe<Scalars['Int']>;
  bedroom?: InputMaybe<Scalars['Int']>;
  cabinet?: InputMaybe<Scalars['Int']>;
  clothesWashing?: InputMaybe<Scalars['Int']>;
  curtains?: InputMaybe<Scalars['Int']>;
  fridge?: InputMaybe<Scalars['Boolean']>;
  kitchen?: InputMaybe<Scalars['Int']>;
  kitchenInside?: InputMaybe<Scalars['Boolean']>;
  livingRoom?: InputMaybe<Scalars['Int']>;
  oven?: InputMaybe<Scalars['Boolean']>;
  petExists?: InputMaybe<Scalars['Boolean']>;
  premiumLiquids?: InputMaybe<Scalars['Boolean']>;
  studio?: InputMaybe<Scalars['Int']>;
  wardrobe?: InputMaybe<Scalars['Boolean']>;
};

export type ApolloCity = {
  __typename?: 'ApolloCity';
  country: Country;
  countryCode: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum AuthType {
  Client = 'client',
  Employee = 'employee',
  User = 'user'
}

export type BooleanFilterOperatorInput = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<Scalars['Boolean']>;
};

export type BusyTime = {
  __typename?: 'BusyTime';
  busyFrom: Scalars['String'];
  busyTo: Scalars['String'];
  contractEndDate?: Maybe<Scalars['String']>;
  contractStartDate?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  daysInMonth?: Maybe<Scalars['Int']>;
  employee?: Maybe<Employee>;
  id: Scalars['String'];
  tool?: Maybe<Tool>;
  unavailableFrom?: Maybe<Scalars['String']>;
  unavailableTo?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type ChangeMyPasswordInput = {
  authType: AuthType;
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Chat = {
  __typename?: 'Chat';
  chatUUID: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  guestClientId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type ChemicalCleaning = {
  __typename?: 'ChemicalCleaning';
  armchair?: Maybe<Scalars['Int']>;
  carpet?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  fiveSeaterSofa?: Maybe<Scalars['Int']>;
  fourSeaterSofa?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  mattress?: Maybe<Scalars['Int']>;
  sixSeaterSofa?: Maybe<Scalars['Int']>;
  softChair?: Maybe<Scalars['Int']>;
  threeSeaterSofa?: Maybe<Scalars['Int']>;
  twoSeaterSofa?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
};

export type ChemicalCleaningInput = {
  armchair?: InputMaybe<Scalars['Int']>;
  carpet?: InputMaybe<Scalars['Int']>;
  fiveSeaterSofa?: InputMaybe<Scalars['Int']>;
  fourSeaterSofa?: InputMaybe<Scalars['Int']>;
  mattress?: InputMaybe<Scalars['Int']>;
  sixSeaterSofa?: InputMaybe<Scalars['Int']>;
  softChair?: InputMaybe<Scalars['Int']>;
  threeSeaterSofa?: InputMaybe<Scalars['Int']>;
  twoSeaterSofa?: InputMaybe<Scalars['Int']>;
};

export type Client = {
  __typename?: 'Client';
  addresses?: Maybe<Array<Address>>;
  birthDate?: Maybe<Scalars['String']>;
  clientReviews?: Maybe<Array<ClientReview>>;
  createdAt: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isVerified?: Maybe<Scalars['Boolean']>;
  language: Language;
  lastName?: Maybe<Scalars['String']>;
  mobile: Scalars['String'];
  notificationsEnabled?: Maybe<Scalars['Boolean']>;
  orders?: Maybe<Array<Order>>;
  password?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  pushToken?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  smsEnabled?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['String'];
  verificationCode?: Maybe<Scalars['String']>;
};

export type ClientPerDay = {
  __typename?: 'ClientPerDay';
  client: Scalars['Int'];
  date: Scalars['String'];
};

export type ClientReview = {
  __typename?: 'ClientReview';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  order?: Maybe<Order>;
  rating: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type ClientSignupInput = {
  androidSignature?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  language: Language;
  lastName?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type ClientSignupResponse = {
  __typename?: 'ClientSignupResponse';
  token: Scalars['String'];
  user: Client;
};

export type ClientSingInResponse = {
  __typename?: 'ClientSingInResponse';
  token: Scalars['String'];
  user: Client;
};

export type ClientUpdateMyProfileResponse = {
  __typename?: 'ClientUpdateMyProfileResponse';
  token?: Maybe<Scalars['String']>;
  user: Client;
};

export type ConnectIdInput = {
  id: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CreateAddressByAdminInput = {
  apartment?: InputMaybe<Scalars['String']>;
  cityId: Scalars['String'];
  clientId: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  entrance?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  street: Scalars['String'];
};

export type CreateAddressInput = {
  apartment?: InputMaybe<Scalars['String']>;
  cityId: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  entrance?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  street: Scalars['String'];
};

export type CreateAlertInput = {
  message: Scalars['String'];
  orderId: Scalars['String'];
  seen: Scalars['Boolean'];
  type: AlertType;
};

export type CreateBasicInput = {
  name: Scalars['String'];
};

export type CreateBusyTimeInput = {
  busyFrom?: InputMaybe<Scalars['String']>;
  busyTo?: InputMaybe<Scalars['String']>;
  contractEndDate?: InputMaybe<Scalars['String']>;
  contractStartDate?: InputMaybe<Scalars['String']>;
  daysInMonth?: InputMaybe<Scalars['Int']>;
  employeeId?: InputMaybe<Scalars['String']>;
  toolId?: InputMaybe<Scalars['String']>;
  unavailableFrom?: InputMaybe<Scalars['String']>;
  unavailableTo?: InputMaybe<Scalars['String']>;
};

export type CreateCityInput = {
  countryCode: Scalars['String'];
  name: Scalars['String'];
};

export type CreateClientReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  orderId: Scalars['String'];
  rating: Scalars['Float'];
};

export type CreateCountryInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type CreateDocumentInput = {
  expensesId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CreateEmployeeInput = {
  cityId: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emergencyContact?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  isTeamLead: Scalars['Boolean'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Float']>;
  salary: Scalars['Float'];
  speakingLanguages: Array<Language>;
  specialities: Array<Speciality>;
  street: Scalars['String'];
  workingDaysAndHours: Array<WorkingDayAndHourInput>;
};

export type CreateExpenseInput = {
  amount: Scalars['Float'];
  date: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
};

export type CreateMessageInput = {
  chatUUID: Scalars['String'];
  guestClientId?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
};

export type CreateOrderInput = {
  addressId: Scalars['String'];
  apartmentCleaning?: InputMaybe<ApartmentCleaningInput>;
  area?: InputMaybe<Scalars['Int']>;
  assignedEmployeesIds: Array<Scalars['String']>;
  assignedToolsIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  bathroom?: InputMaybe<Scalars['Int']>;
  bedroom?: InputMaybe<Scalars['Int']>;
  cabinet?: InputMaybe<Scalars['Int']>;
  comment?: InputMaybe<Scalars['String']>;
  duration: Scalars['Int'];
  endTime: Scalars['String'];
  kitchen?: InputMaybe<Scalars['Int']>;
  livingRoom?: InputMaybe<Scalars['Int']>;
  paymentMethod: PaymentMethod;
  paymentStatus?: InputMaybe<PaymentStatus>;
  price: Scalars['Float'];
  serviceType?: InputMaybe<ServiceType>;
  startTime: Scalars['String'];
  studio?: InputMaybe<Scalars['Int']>;
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateSimpleClientInput = {
  birthDate?: InputMaybe<Scalars['String']>;
  cityId: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  language: Language;
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  street: Scalars['String'];
};

export type CreateSimpleOrderInput = {
  addressId: Scalars['String'];
  apartmentCleaning?: InputMaybe<ApartmentCleaningInput>;
  chemicalCleaning?: InputMaybe<ChemicalCleaningInput>;
  cleanersQuantity?: InputMaybe<Scalars['Int']>;
  clientId?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  duration: Scalars['Int'];
  endTime: Scalars['String'];
  maid?: InputMaybe<MaidInput>;
  paymentMethod: PaymentMethod;
  paymentStatus?: InputMaybe<PaymentStatus>;
  price: Scalars['Float'];
  serviceSubType: ServiceSubType;
  serviceType: ServiceType;
  startTime: Scalars['String'];
  swimmingPoolCleaning?: InputMaybe<SwimmingPoolCleaningInput>;
};

export type CreateToolInput = {
  description: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  name: Scalars['String'];
  toolType: ToolType;
};

export type CreateUserInput = {
  active: Scalars['Boolean'];
  cityId: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  street: Scalars['String'];
};

export type CreateWorkingDayAndHourInput = {
  employeeId: Scalars['String'];
  workingDaysAndHours: Array<WorkingDayAndHourInput>;
};

export type DailyOrderLimit = {
  __typename?: 'DailyOrderLimit';
  createdAt: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['String'];
  limit: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['String'];
  expenses?: Maybe<Expense>;
  expensesId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  address: Address;
  assignedOrders?: Maybe<Array<Order>>;
  busyTimes?: Maybe<Array<BusyTime>>;
  createdAt: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  emergencyContact?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  isTeamLead: Scalars['Boolean'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  pushToken?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  salary: Scalars['Float'];
  speakingLanguages?: Maybe<Array<Language>>;
  specialities: Array<Speciality>;
  updatedAt: Scalars['String'];
  verificationCode?: Maybe<Scalars['String']>;
  workingDaysAndHours?: Maybe<Array<WorkingDayAndHour>>;
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  documents?: Maybe<Array<Document>>;
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ExpensePerDay = {
  __typename?: 'ExpensePerDay';
  date: Scalars['String'];
  expense: Scalars['Int'];
};

export type FilterAddressesInput = {
  city?: InputMaybe<StringFilterOperatorInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  details?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  latitude?: InputMaybe<FloatFilterOperatorInput>;
  longitude?: InputMaybe<FloatFilterOperatorInput>;
  street?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterBasicInput = {
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  name?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterBusyTimeInput = {
  busyFrom?: InputMaybe<StringFilterOperatorInput>;
  busyTo?: InputMaybe<StringFilterOperatorInput>;
  contractEndDate?: InputMaybe<StringFilterOperatorInput>;
  contractStartDate?: InputMaybe<StringFilterOperatorInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  daysInMonth?: InputMaybe<IntFilterOperatorInput>;
  employee?: InputMaybe<FilterEmployeeInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  unavailableFrom?: InputMaybe<StringFilterOperatorInput>;
  unavailableTo?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterCitiesInput = {
  country?: InputMaybe<FilterCountriesInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  name?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterClientInput = {
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  email?: InputMaybe<StringFilterOperatorInput>;
  firstName?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  language?: InputMaybe<StringFilterOperatorInput>;
  lastName?: InputMaybe<StringFilterOperatorInput>;
  mobile?: InputMaybe<StringFilterOperatorInput>;
  rating?: InputMaybe<FloatFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterClientReviewsInput = {
  comment?: InputMaybe<StringFilterOperatorInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  order?: InputMaybe<FilterOrderInput>;
  rating?: InputMaybe<FloatFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterCountriesInput = {
  code?: InputMaybe<StringFilterOperatorInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  name?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterEmployeeInput = {
  address?: InputMaybe<StringFilterOperatorInput>;
  city?: InputMaybe<FilterCitiesInput>;
  clientRating?: InputMaybe<FloatFilterOperatorInput>;
  country?: InputMaybe<FilterCountriesInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  email?: InputMaybe<StringFilterOperatorInput>;
  emergencyContact?: InputMaybe<StringFilterOperatorInput>;
  firstName?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  isAvailable?: InputMaybe<BooleanFilterOperatorInput>;
  lastName?: InputMaybe<StringFilterOperatorInput>;
  mobile?: InputMaybe<StringFilterOperatorInput>;
  salary?: InputMaybe<FloatFilterOperatorInput>;
  speakingLanguages?: InputMaybe<LogicalStringsFilterInput>;
  specialities?: InputMaybe<LogicalStringsFilterInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterOrderInput = {
  address?: InputMaybe<FilterAddressesInput>;
  area?: InputMaybe<IntFilterOperatorInput>;
  bathroom?: InputMaybe<IntFilterOperatorInput>;
  bedroom?: InputMaybe<IntFilterOperatorInput>;
  cabinet?: InputMaybe<IntFilterOperatorInput>;
  closedAt?: InputMaybe<StringFilterOperatorInput>;
  comment?: InputMaybe<StringFilterOperatorInput>;
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  createdAtFrom?: InputMaybe<Scalars['String']>;
  createdAtTo?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<IntFilterOperatorInput>;
  endTime?: InputMaybe<StringFilterOperatorInput>;
  expense?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<StringFilterOperatorInput>;
  keyword?: InputMaybe<Scalars['String']>;
  kitchen?: InputMaybe<IntFilterOperatorInput>;
  liveStreamRooms?: InputMaybe<Scalars['String']>;
  livingRoom?: InputMaybe<IntFilterOperatorInput>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  paymentStatus?: InputMaybe<PaymentStatus>;
  price?: InputMaybe<FloatFilterOperatorInput>;
  priceFrom?: InputMaybe<Scalars['Int']>;
  priceTo?: InputMaybe<Scalars['Int']>;
  seenByManager?: InputMaybe<BooleanFilterOperatorInput>;
  serviceSubType?: InputMaybe<ServiceSubType>;
  serviceType?: InputMaybe<ServiceType>;
  startTime?: InputMaybe<StringFilterOperatorInput>;
  startTimeFrom?: InputMaybe<Scalars['String']>;
  startTimeTo?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<OrderStatus>;
  studio?: InputMaybe<IntFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterProductsInput = {
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  name?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterToolsInput = {
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  description?: InputMaybe<StringFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  isAvailable?: InputMaybe<BooleanFilterOperatorInput>;
  name?: InputMaybe<StringFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterUserInput = {
  email: StringFilterOperatorInput;
  firstName: StringFilterOperatorInput;
  lastName?: InputMaybe<StringFilterOperatorInput>;
  mobile: StringFilterOperatorInput;
  role?: InputMaybe<StringFilterOperatorInput>;
};

export type FilterWorkingDaysAndHoursInput = {
  createdAt?: InputMaybe<StringFilterOperatorInput>;
  employee?: InputMaybe<FilterEmployeeInput>;
  endTime?: InputMaybe<StringFilterOperatorInput>;
  endWeekday?: InputMaybe<IntFilterOperatorInput>;
  id?: InputMaybe<StringFilterOperatorInput>;
  startTime?: InputMaybe<StringFilterOperatorInput>;
  startWeekday?: InputMaybe<IntFilterOperatorInput>;
  updatedAt?: InputMaybe<StringFilterOperatorInput>;
};

export type FloatFilterOperatorInput = {
  contains?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GetDocumentInput = {
  expensesId?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
};

export type GetSlotsInput = {
  end: Scalars['String'];
  equipment?: InputMaybe<Array<InputMaybe<ToolDetail>>>;
  speakingLanguages: Array<Language>;
  specialities: Array<SpecialityDetail>;
  start: Scalars['String'];
};

export type IntFilterOperatorInput = {
  contains?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export enum Language {
  En = 'EN',
  Ka = 'KA',
  Ru = 'RU'
}

export type LanguageInput = {
  code: Scalars['String'];
};

export type Links = {
  __typename?: 'Links';
  method?: Maybe<Scalars['String']>;
  rel?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LogicalStringsFilterInput = {
  key: Scalars['String'];
  operator: LogicalOperator;
  values?: InputMaybe<Array<Scalars['String']>>;
};

export type Maid = {
  __typename?: 'Maid';
  createdAt: Scalars['String'];
  hours: Scalars['Int'];
  id: Scalars['String'];
  quantity: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type MaidInput = {
  hours: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type Message = {
  __typename?: 'Message';
  chatUUID: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  sentByClientId?: Maybe<Scalars['String']>;
  sentBySupportId?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type MessagesResult = {
  __typename?: 'MessagesResult';
  messages: Array<Message>;
  totalCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  callBack?: Maybe<Scalars['String']>;
  cancelOrder?: Maybe<ResponseMessage>;
  cancelSimpleOrder?: Maybe<Order>;
  changeMyPassword?: Maybe<SuccessMessage>;
  clientSignUp: ClientSignupResponse;
  createAddress?: Maybe<Address>;
  createAddressByAdmin?: Maybe<Address>;
  createAlert?: Maybe<Alert>;
  createBusyTime?: Maybe<BusyTime>;
  createCity?: Maybe<ApolloCity>;
  createClientReview?: Maybe<ClientReview>;
  createCountry?: Maybe<Country>;
  createDocument: Document;
  createEmployee?: Maybe<Employee>;
  createExpense: Expense;
  createMessage: Message;
  createOrder?: Maybe<Order>;
  createOrderReview?: Maybe<OrderReview>;
  createPayment?: Maybe<PaymentResponse>;
  createProduct?: Maybe<Product>;
  createSimpleClient: Client;
  createSimpleOrder?: Maybe<Order>;
  createTool?: Maybe<Tool>;
  createUser?: Maybe<User>;
  createWorkingDayAndHour?: Maybe<ResponseMessage>;
  deleteAddress?: Maybe<ResponseMessage>;
  deleteAlert?: Maybe<Alert>;
  deleteBusyTime?: Maybe<ResponseMessage>;
  deleteCity?: Maybe<ResponseMessage>;
  deleteClient?: Maybe<ResponseMessage>;
  deleteClientReview?: Maybe<ResponseMessage>;
  deleteCountry?: Maybe<ResponseMessage>;
  deleteEmployee?: Maybe<ResponseMessage>;
  deleteOrderReview?: Maybe<OrderReview>;
  deleteProduct?: Maybe<Product>;
  deleteSimpleOrder?: Maybe<Order>;
  deleteTool?: Maybe<ResponseMessage>;
  deleteUser?: Maybe<ResponseMessage>;
  deleteWorkingDayAndHour?: Maybe<ResponseMessage>;
  pickedEmployeesForSwap?: Maybe<Array<Employee>>;
  resendVerificationCode?: Maybe<ResponseMessage>;
  resetPassword?: Maybe<UserObjectResponse>;
  sendNotificationByPushToken?: Maybe<ResponseMessage>;
  sendVerificationCode?: Maybe<ResponseMessage>;
  signin?: Maybe<ClientSingInResponse>;
  signinCrm?: Maybe<SignInCrmResponse>;
  signout?: Maybe<SuccessMessage>;
  swapEmployees?: Maybe<Order>;
  updateAddress?: Maybe<Address>;
  updateAlert?: Maybe<Alert>;
  updateBusyTime?: Maybe<BusyTime>;
  updateCity?: Maybe<ApolloCity>;
  updateClient: Client;
  updateClientPhoto: Client;
  updateClientReview?: Maybe<ClientReview>;
  updateCountry?: Maybe<Country>;
  updateEmployee: Employee;
  updateMyMobile?: Maybe<SuccessMessage>;
  updateMyProfile: ClientUpdateMyProfileResponse;
  updateOrder?: Maybe<Order>;
  updateOrderByAdmin?: Maybe<Order>;
  updateOrderReview?: Maybe<OrderReview>;
  updateProduct?: Maybe<Product>;
  updateTool?: Maybe<Tool>;
  updateUser?: Maybe<User>;
  updateWorkingDayAndHour?: Maybe<ResponseMessage>;
  verifyCode?: Maybe<ResponseMessage>;
};


export type MutationCancelOrderArgs = {
  id: Scalars['String'];
};


export type MutationCancelSimpleOrderArgs = {
  id: Scalars['String'];
};


export type MutationChangeMyPasswordArgs = {
  data?: InputMaybe<ChangeMyPasswordInput>;
};


export type MutationClientSignUpArgs = {
  data: ClientSignupInput;
  language: Language;
};


export type MutationCreateAddressArgs = {
  data: CreateAddressInput;
};


export type MutationCreateAddressByAdminArgs = {
  data: CreateAddressByAdminInput;
};


export type MutationCreateAlertArgs = {
  data: CreateAlertInput;
};


export type MutationCreateBusyTimeArgs = {
  data: CreateBusyTimeInput;
};


export type MutationCreateCityArgs = {
  data: CreateCityInput;
};


export type MutationCreateClientReviewArgs = {
  data: CreateClientReviewInput;
};


export type MutationCreateCountryArgs = {
  data: CreateCountryInput;
};


export type MutationCreateDocumentArgs = {
  data: CreateDocumentInput;
};


export type MutationCreateEmployeeArgs = {
  data: CreateEmployeeInput;
};


export type MutationCreateExpenseArgs = {
  data: CreateExpenseInput;
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
};


export type MutationCreateOrderReviewArgs = {
  data: CreateOrderReviewInput;
};


export type MutationCreatePaymentArgs = {
  data: CreatePaymentInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateSimpleClientArgs = {
  input: CreateSimpleClientInput;
};


export type MutationCreateSimpleOrderArgs = {
  data: CreateSimpleOrderInput;
};


export type MutationCreateToolArgs = {
  data: CreateToolInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateWorkingDayAndHourArgs = {
  data: CreateWorkingDayAndHourInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['String'];
};


export type MutationDeleteAlertArgs = {
  alertId: Scalars['String'];
};


export type MutationDeleteBusyTimeArgs = {
  data: DeleteBusyTimeInput;
};


export type MutationDeleteCityArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClientReviewArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCountryArgs = {
  code: Scalars['String'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOrderReviewArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSimpleOrderArgs = {
  id: Scalars['String'];
};


export type MutationDeleteToolArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDeleteWorkingDayAndHourArgs = {
  id: Scalars['String'];
};


export type MutationPickedEmployeesForSwapArgs = {
  data: PickedEmployeesForSwapInput;
};


export type MutationResendVerificationCodeArgs = {
  data: ResendVerificationCodeInput;
  language: Language;
};


export type MutationResetPasswordArgs = {
  data?: InputMaybe<PasswordResetInput>;
  language: Language;
};


export type MutationSendNotificationByPushTokenArgs = {
  data: SendNotificationByPushTokenInput;
};


export type MutationSendVerificationCodeArgs = {
  data?: InputMaybe<SendVerificationCodeInput>;
  language: Language;
};


export type MutationSigninArgs = {
  data: SignInInput;
  language: Language;
};


export type MutationSigninCrmArgs = {
  data: SignInInput;
  language: Language;
};


export type MutationSwapEmployeesArgs = {
  data: SwapEmployeeInput;
};


export type MutationUpdateAddressArgs = {
  data: UpdateAddressInput;
};


export type MutationUpdateAlertArgs = {
  data: UpdateAlertInput;
};


export type MutationUpdateBusyTimeArgs = {
  data: UpdateBusyTimeInput;
};


export type MutationUpdateCityArgs = {
  data: UpdateCityInput;
};


export type MutationUpdateClientArgs = {
  data: UpdateClientInput;
};


export type MutationUpdateClientPhotoArgs = {
  data: UpdateClientPhotoInput;
};


export type MutationUpdateClientReviewArgs = {
  data: UpdateClientReviewInput;
};


export type MutationUpdateCountryArgs = {
  data: UpdateCountryInput;
};


export type MutationUpdateEmployeeArgs = {
  data: UpdateEmployeeInput;
};


export type MutationUpdateMyMobileArgs = {
  data: UpdateMyMobileInput;
};


export type MutationUpdateMyProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationUpdateOrderArgs = {
  data: UpdateOrderInput;
};


export type MutationUpdateOrderByAdminArgs = {
  data: UpdateOrderInputByAdmin;
};


export type MutationUpdateOrderReviewArgs = {
  data: UpdateOrderReviewInput;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationUpdateToolArgs = {
  data: UpdateToolInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  language: Language;
};


export type MutationUpdateWorkingDayAndHourArgs = {
  data: UpdateWorkingDayAndHourInput;
};


export type MutationVerifyCodeArgs = {
  data: VerifyCodeInput;
  language: Language;
};

export type Order = {
  __typename?: 'Order';
  address: Address;
  apartmentCleaning?: Maybe<ApartmentCleaning>;
  assignedEmployees?: Maybe<Array<Maybe<Employee>>>;
  assignedTools?: Maybe<Array<Maybe<Tool>>>;
  chemicalCleaning?: Maybe<ChemicalCleaning>;
  cleanersQuantity?: Maybe<Scalars['Int']>;
  client: Client;
  closedAt?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  document?: Maybe<Array<Maybe<Document>>>;
  duration: Scalars['Int'];
  endTime: Scalars['String'];
  expense?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  liveStreamRooms?: Maybe<Scalars['String']>;
  maid?: Maybe<Maid>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentStatus?: Maybe<PaymentStatus>;
  price: Scalars['Float'];
  seenByManager: Scalars['Boolean'];
  serviceSubType?: Maybe<ServiceSubType>;
  serviceType?: Maybe<ServiceType>;
  startTime: Scalars['String'];
  status: OrderStatus;
  swimmingPoolCleaning?: Maybe<SwimmingPoolCleaning>;
  updatedAt: Scalars['String'];
};

export type OrderPerDay = {
  __typename?: 'OrderPerDay';
  date: Scalars['String'];
  order: Scalars['Int'];
};

export type OrderReview = {
  __typename?: 'OrderReview';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  orderId: Scalars['String'];
  orderRating?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
};

export type OrderSpecialityDetail = {
  __typename?: 'OrderSpecialityDetail';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  quantityNeeded: Scalars['Int'];
  specialityNeededId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Dispatched = 'DISPATCHED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
  Rated = 'RATED',
  Rejected = 'REJECTED',
  Seen = 'SEEN'
}

export type PaginationInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type PasswordResetInput = {
  authType: AuthType;
  email?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
  password: Scalars['String'];
  verificationCode: Scalars['String'];
};

export enum PaymentMethod {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD'
}

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  developerMessage?: Maybe<Scalars['String']>;
  httpStatusCode?: Maybe<Scalars['Int']>;
  links?: Maybe<Array<Maybe<Links>>>;
  orderId?: Maybe<Scalars['String']>;
  payId?: Maybe<Scalars['String']>;
  preAuth?: Maybe<Scalars['Boolean']>;
  recId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
  userMessage?: Maybe<Scalars['String']>;
};

export enum PaymentStatus {
  Declined = 'DECLINED',
  Paid = 'PAID',
  Processing = 'PROCESSING',
  Unpaid = 'UNPAID'
}

export type PickedEmployeesForSwapInput = {
  employeeId: Scalars['String'];
  orderId: Scalars['String'];
};

export enum PoolType {
  Indoor = 'INDOOR',
  Outdoor = 'OUTDOOR'
}

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProfitPerDay = {
  __typename?: 'ProfitPerDay';
  date: Scalars['String'];
  profit: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  checkOrderLimitForDay: Scalars['Boolean'];
  getAddress?: Maybe<Address>;
  getAlert?: Maybe<Alert>;
  getAllAddresses?: Maybe<Array<Maybe<Address>>>;
  getAllAlerts?: Maybe<Array<Alert>>;
  getAllBusyTimes?: Maybe<Array<Maybe<BusyTime>>>;
  getAllChat?: Maybe<Array<Maybe<Chat>>>;
  getAllCities?: Maybe<Array<ApolloCity>>;
  getAllClients?: Maybe<Array<Client>>;
  getAllCountries?: Maybe<Array<Country>>;
  getAllCrmOrders?: Maybe<Array<Order>>;
  getAllEmployees?: Maybe<Array<Employee>>;
  getAllOrderReviews?: Maybe<Array<OrderReview>>;
  getAllOrders?: Maybe<Array<Order>>;
  getAllProducts?: Maybe<Array<Maybe<Product>>>;
  getAllTools?: Maybe<Array<Tool>>;
  getAllUsers?: Maybe<Array<User>>;
  getAllWorkingDaysAndHours?: Maybe<Array<Maybe<WorkingDayAndHour>>>;
  getBusyTime?: Maybe<BusyTime>;
  getCity?: Maybe<ApolloCity>;
  getClient?: Maybe<Client>;
  getClientAllReviews?: Maybe<Array<Maybe<ClientReview>>>;
  getClientLatestChatId?: Maybe<Scalars['String']>;
  getClientReview?: Maybe<ClientReview>;
  getClientsChart: Array<ClientPerDay>;
  getCountry?: Maybe<Country>;
  getDocument?: Maybe<Array<Document>>;
  getEmployee?: Maybe<Employee>;
  getExpense?: Maybe<Array<Expense>>;
  getExpensesChart: Array<ExpensePerDay>;
  getMessages: MessagesResult;
  getOrder?: Maybe<Order>;
  getOrderReview?: Maybe<OrderReview>;
  getOrdersChart: Array<OrderPerDay>;
  getProduct?: Maybe<Product>;
  getProfit: Array<ProfitPerDay>;
  getRevenue: Array<RevenuePerDay>;
  getSlots?: Maybe<Slots>;
  getTbcToken: Scalars['String'];
  getTool?: Maybe<Tool>;
  getUser?: Maybe<User>;
  getWorkingDayAndHour?: Maybe<WorkingDayAndHour>;
  me?: Maybe<User>;
};


export type QueryCheckOrderLimitForDayArgs = {
  date: Scalars['String'];
};


export type QueryGetAddressArgs = {
  id: Scalars['String'];
};


export type QueryGetAlertArgs = {
  id: Scalars['String'];
};


export type QueryGetAllAddressesArgs = {
  filters?: InputMaybe<FilterAddressesInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortAddressesInput>;
};


export type QueryGetAllBusyTimesArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<FilterBusyTimeInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortBusyTimeInput>;
  toolId?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllChatArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetAllCitiesArgs = {
  filters?: InputMaybe<FilterCitiesInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortCitiesInput>;
};


export type QueryGetAllClientsArgs = {
  filters?: InputMaybe<FilterClientInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortClientInput>;
};


export type QueryGetAllCountriesArgs = {
  filters?: InputMaybe<FilterCountriesInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortCountriesInput>;
};


export type QueryGetAllCrmOrdersArgs = {
  clientId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<FilterOrderInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortOrderInput>;
};


export type QueryGetAllEmployeesArgs = {
  filters?: InputMaybe<FilterEmployeeInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortEmployeeInput>;
};


export type QueryGetAllOrderReviewsArgs = {
  id: Scalars['String'];
};


export type QueryGetAllOrdersArgs = {
  clientId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<FilterOrderInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortOrderInput>;
};


export type QueryGetAllProductsArgs = {
  filters?: InputMaybe<FilterProductsInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortBasicInput>;
};


export type QueryGetAllToolsArgs = {
  filters?: InputMaybe<FilterToolsInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortToolsInput>;
};


export type QueryGetAllUsersArgs = {
  filters?: InputMaybe<FilterUserInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortUserInput>;
};


export type QueryGetAllWorkingDaysAndHoursArgs = {
  filters?: InputMaybe<FilterWorkingDaysAndHoursInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortWorkingDaysAndHoursInput>;
};


export type QueryGetBusyTimeArgs = {
  id: Scalars['String'];
};


export type QueryGetCityArgs = {
  id: Scalars['String'];
};


export type QueryGetClientArgs = {
  id: Scalars['String'];
};


export type QueryGetClientAllReviewsArgs = {
  clientId: Scalars['String'];
  filters?: InputMaybe<FilterClientReviewsInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortClientReviewsInput>;
};


export type QueryGetClientLatestChatIdArgs = {
  data: GetClientLatestChatIdInput;
};


export type QueryGetClientReviewArgs = {
  id: Scalars['String'];
};


export type QueryGetClientsChartArgs = {
  data: FilterChartData;
};


export type QueryGetCountryArgs = {
  code: Scalars['String'];
};


export type QueryGetDocumentArgs = {
  data?: InputMaybe<GetDocumentInput>;
};


export type QueryGetEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryGetExpenseArgs = {
  data?: InputMaybe<FilterChartData>;
};


export type QueryGetExpensesChartArgs = {
  data: FilterChartData;
};


export type QueryGetMessagesArgs = {
  chatUUID?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetOrderArgs = {
  id: Scalars['String'];
};


export type QueryGetOrderReviewArgs = {
  id: Scalars['String'];
};


export type QueryGetOrdersChartArgs = {
  data: FilterChartData;
};


export type QueryGetProductArgs = {
  id: Scalars['String'];
};


export type QueryGetProfitArgs = {
  data: FilterChartData;
};


export type QueryGetRevenueArgs = {
  data: FilterChartData;
};


export type QueryGetSlotsArgs = {
  data?: InputMaybe<GetSlotsInput>;
};


export type QueryGetToolArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetWorkingDayAndHourArgs = {
  id: Scalars['String'];
};


export type QueryMeArgs = {
  authType?: InputMaybe<AuthType>;
};

export type ResendVerificationCodeInput = {
  androidSignature?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type ResponseMessageWithToken = {
  __typename?: 'ResponseMessageWithToken';
  message?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type RevenuePerDay = {
  __typename?: 'RevenuePerDay';
  date: Scalars['String'];
  revenue: Scalars['Int'];
};

export type SendVerificationCodeInput = {
  androidSignature?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
};

export enum ServiceSubType {
  Basic = 'BASIC',
  Premium = 'PREMIUM',
  Standart = 'STANDART'
}

export enum ServiceType {
  AfterRenovation = 'AFTER_RENOVATION',
  ChemicalCleaning = 'CHEMICAL_CLEANING',
  GeneralCleaning = 'GENERAL_CLEANING',
  Maid = 'MAID',
  RegularCleaning = 'REGULAR_CLEANING',
  SwimmingPoolCleaning = 'SWIMMING_POOL_CLEANING'
}

export type SignInCrmResponse = {
  __typename?: 'SignInCrmResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type SignInInput = {
  authType: AuthType;
  email?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  pushToken?: InputMaybe<Scalars['String']>;
};

export type SlotResponse = {
  __typename?: 'SlotResponse';
  employeeIds: Array<Scalars['String']>;
  start: Scalars['String'];
  toolIds?: Maybe<Array<Scalars['String']>>;
};

export type Slots = {
  __typename?: 'Slots';
  availableSlots?: Maybe<Array<Maybe<SlotResponse>>>;
};

export type SortAddressesInput = {
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  details?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortBasicInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortBusyTimeInput = {
  busyFrom?: InputMaybe<SortOrder>;
  busyTo?: InputMaybe<SortOrder>;
  contractEndDate?: InputMaybe<SortOrder>;
  contractStartDate?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  daysInMonth?: InputMaybe<SortOrder>;
  employee?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  unavailableFrom?: InputMaybe<SortOrder>;
  unavailableTo?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortCitiesInput = {
  contry?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortClientInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  language?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  mobile?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortClientReviewsInput = {
  comment?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  order?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortCountriesInput = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortEmployeeInput = {
  address?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  clientRating?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  emergencyContact?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAvailable?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  mobile?: InputMaybe<SortOrder>;
  salary?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortOrderInput = {
  address?: InputMaybe<SortOrder>;
  area?: InputMaybe<SortOrder>;
  bathroom?: InputMaybe<SortOrder>;
  bedroom?: InputMaybe<SortOrder>;
  cabinet?: InputMaybe<SortOrder>;
  closedAt?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  endTime?: InputMaybe<SortOrder>;
  expense?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  kitchen?: InputMaybe<SortOrder>;
  livingRoom?: InputMaybe<SortOrder>;
  paymentMethod?: InputMaybe<SortOrder>;
  paymentStatus?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  seenByManager?: InputMaybe<SortOrder>;
  serviceSubType?: InputMaybe<SortOrder>;
  serviceType?: InputMaybe<SortOrder>;
  startTime?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  studio?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortToolsInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAvailable?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SortUserInput = {
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  mobile?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
};

export type SortWorkingDaysAndHoursInput = {
  createdAt?: InputMaybe<SortOrder>;
  employee?: InputMaybe<SortOrder>;
  endTime?: InputMaybe<SortOrder>;
  endWeekday?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  startTime?: InputMaybe<SortOrder>;
  startWeekday?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum Speciality {
  GeneralCleaner = 'GENERAL_CLEANER',
  Maid = 'MAID',
  WindowCleaner = 'WINDOW_CLEANER'
}

export type SpecialityDetail = {
  quantity: Scalars['Int'];
  speciality: Speciality;
};

export enum StatusType {
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Rejected = 'REJECTED'
}

export type StringFilterOperatorInput = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent: Message;
  paymentStatusUpdated: Scalars['String'];
};


export type SubscriptionMessageSentArgs = {
  data: SubscriptionMessageSent;
};


export type SubscriptionPaymentStatusUpdatedArgs = {
  paymentId: Scalars['String'];
};

export type SubscriptionMessageSent = {
  chatUUID: Scalars['String'];
  guestClientId?: InputMaybe<Scalars['String']>;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']>;
};

export type SwapEmployeeInput = {
  newEmployeeId: Scalars['String'];
  orderId: Scalars['String'];
  previousEmployeeId: Scalars['String'];
};

export type SwimmingPoolCleaning = {
  __typename?: 'SwimmingPoolCleaning';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  poolType: PoolType;
  squareMeter: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type SwimmingPoolCleaningInput = {
  poolType: PoolType;
  squareMeter: Scalars['Int'];
};

export type Tool = {
  __typename?: 'Tool';
  busyTimes?: Maybe<Array<Maybe<BusyTime>>>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  name: Scalars['String'];
  toolType: ToolType;
  updatedAt: Scalars['String'];
};

export type ToolDetail = {
  quantity: Scalars['Int'];
  toolType: ToolType;
};

export enum ToolType {
  HeatCleaner = 'HEAT_CLEANER',
  VacuumCleaner = 'VACUUM_CLEANER'
}

export type UpdateAddressInput = {
  apartment?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  entrance?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  street?: InputMaybe<Scalars['String']>;
};

export type UpdateAlertInput = {
  id: Scalars['String'];
  seen: Scalars['Boolean'];
};

export type UpdateBasicInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateBusyTimeInput = {
  busyFrom?: InputMaybe<Scalars['String']>;
  busyTo?: InputMaybe<Scalars['String']>;
  contractEndDate?: InputMaybe<Scalars['String']>;
  contractStartDate?: InputMaybe<Scalars['String']>;
  daysInMonth?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  unavailableFrom?: InputMaybe<Scalars['String']>;
  unavailableTo?: InputMaybe<Scalars['String']>;
};

export type UpdateCityInput = {
  countryCode: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateClientInput = {
  birthDate?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isVerified?: InputMaybe<Scalars['Boolean']>;
  language: Language;
  lastName?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
  notificationsEnabled: Scalars['Boolean'];
  photo?: InputMaybe<Scalars['String']>;
  pushToken?: InputMaybe<Scalars['String']>;
  smsEnabled: Scalars['Boolean'];
};

export type UpdateClientPhotoInput = {
  photo: Scalars['String'];
};

export type UpdateClientReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  rating?: InputMaybe<Scalars['Float']>;
};

export type UpdateCountryInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateEmployeeInput = {
  addressId: Scalars['String'];
  cityId?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emergencyContact?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  isTeamLead: Scalars['Boolean'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Float']>;
  salary: Scalars['Float'];
  speakingLanguages?: InputMaybe<Array<Language>>;
  specialities?: InputMaybe<Array<Speciality>>;
  street?: InputMaybe<Scalars['String']>;
  workingDaysAndHours?: InputMaybe<Array<WorkingDayAndHourInput>>;
};

export type UpdateMyMobileInput = {
  authType: AuthType;
  mobile: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type UpdateOrderInput = {
  addressId?: InputMaybe<Scalars['String']>;
  apartmentCleaning?: InputMaybe<ApartmentCleaningInput>;
  area?: InputMaybe<Scalars['Int']>;
  assignedEmployeesIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  assignedToolsIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  bathroom?: InputMaybe<Scalars['Int']>;
  bedroom?: InputMaybe<Scalars['Int']>;
  cabinet?: InputMaybe<Scalars['Int']>;
  chemicalCleaning?: InputMaybe<ChemicalCleaningInput>;
  comment?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  endTime?: InputMaybe<Scalars['String']>;
  expense?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  kitchen?: InputMaybe<Scalars['Int']>;
  liveStreamRooms?: InputMaybe<Scalars['String']>;
  livingRoom?: InputMaybe<Scalars['Int']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  paymentStatus?: InputMaybe<PaymentStatus>;
  price?: InputMaybe<Scalars['Float']>;
  seenByManager?: InputMaybe<Scalars['Boolean']>;
  serviceSubType?: InputMaybe<ServiceSubType>;
  serviceType?: InputMaybe<ServiceType>;
  startTime?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<OrderStatus>;
  studio?: InputMaybe<Scalars['Int']>;
};

export type UpdateOrderInputByAdmin = {
  apartmentCleaning?: InputMaybe<ApartmentCleaningInput>;
  assignedEmployeesIds?: InputMaybe<Array<Scalars['String']>>;
  assignedToolsIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  chemicalCleaning?: InputMaybe<ChemicalCleaningInput>;
  clientId: Scalars['String'];
  comment?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  endTime?: InputMaybe<Scalars['String']>;
  expense?: InputMaybe<Scalars['Int']>;
  orderId: Scalars['String'];
  paymentMethod?: InputMaybe<PaymentMethod>;
  paymentStatus?: InputMaybe<PaymentStatus>;
  price?: InputMaybe<Scalars['Float']>;
  serviceSubType?: InputMaybe<ServiceSubType>;
  serviceType?: InputMaybe<ServiceType>;
  startTime?: InputMaybe<Scalars['String']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Language>;
  lastName?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  notificationsEnabled?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  smsEnabled?: InputMaybe<Scalars['Boolean']>;
  verificationCode?: InputMaybe<Scalars['String']>;
};

export type UpdateToolInput = {
  description: Scalars['String'];
  id: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  name: Scalars['String'];
  toolType: ToolType;
};

export type UpdateUserInput = {
  active: Scalars['Boolean'];
  authType?: InputMaybe<AuthType>;
  cityId: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  language?: InputMaybe<Language>;
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  notificationsEnabled?: InputMaybe<Scalars['Boolean']>;
  photo?: InputMaybe<Scalars['String']>;
  role: UserRole;
  smsEnabled?: InputMaybe<Scalars['Boolean']>;
  street: Scalars['String'];
  userId: Scalars['String'];
  verificationCode?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkingDayAndHourInput = {
  employeeId: Scalars['String'];
  workingDaysAndHours: Array<WorkingDayAndHourInput>;
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  address?: Maybe<Address>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  language: Language;
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  notificationsEnabled: Scalars['Boolean'];
  password: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
  role: UserRole;
  smsEnabled: Scalars['Boolean'];
  updatedAt: Scalars['String'];
};

export type UserObjectResponse = Client | Employee | User;

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER'
}

export enum UserType {
  Client = 'CLIENT',
  Employee = 'EMPLOYEE',
  User = 'USER'
}

export type VerifyCodeInput = {
  code: Scalars['String'];
  mobile: Scalars['String'];
};

export enum WollyErrorCodes {
  InvalidToken = 'INVALID_TOKEN',
  UserNotFound = 'USER_NOT_FOUND'
}

export type WorkingDayAndHour = {
  __typename?: 'WorkingDayAndHour';
  createdAt: Scalars['String'];
  employee: Employee;
  endTime: Scalars['String'];
  endWeekday: Scalars['Int'];
  id: Scalars['String'];
  startTime: Scalars['String'];
  startWeekday: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type WorkingDayAndHourInput = {
  endTime: Scalars['String'];
  endWeekday: Scalars['Int'];
  startTime: Scalars['String'];
  startWeekday: Scalars['Int'];
};

export type CreateOrderReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  orderId: Scalars['String'];
  orderRating: Scalars['Float'];
};

export type CreatePaymentInput = {
  amount: Amount;
  callbackUrl?: InputMaybe<Scalars['String']>;
  expirationMinutes?: InputMaybe<Scalars['Int']>;
  extra?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  merchantPaymentId?: InputMaybe<Scalars['String']>;
  methods?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  orderId: Scalars['String'];
  preAuth?: InputMaybe<Scalars['Boolean']>;
  returnurl: Scalars['String'];
  saveCard?: InputMaybe<Scalars['Boolean']>;
  saveCardToDate?: InputMaybe<Scalars['String']>;
  skipInfoMessage?: InputMaybe<Scalars['Boolean']>;
};

export type DeleteBusyTimeInput = {
  employeeId: Scalars['String'];
  orderId: Scalars['String'];
};

export type FilterChartData = {
  end: Scalars['String'];
  start: Scalars['String'];
};

export type FilterExpenseData = {
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};

export type GetClientLatestChatIdInput = {
  guestClientId?: InputMaybe<Scalars['String']>;
};

export type SendNotificationByPushTokenInput = {
  body: Scalars['String'];
  pushToken: Scalars['String'];
  type: Scalars['String'];
};

export type UpdateOrderReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  orderRating: Scalars['Float'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<AddressModel>;
  Alert: ResolverTypeWrapper<Alert>;
  AlertType: AlertType;
  Amount: Amount;
  ApartmentCleaning: ResolverTypeWrapper<ApartmentCleaning>;
  ApartmentCleaningInput: ApartmentCleaningInput;
  ApolloCity: ResolverTypeWrapper<CityModel>;
  AuthType: AuthType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFilterOperatorInput: BooleanFilterOperatorInput;
  BusyTime: ResolverTypeWrapper<Omit<BusyTime, 'employee' | 'tool'> & { employee?: Maybe<ResolversTypes['Employee']>, tool?: Maybe<ResolversTypes['Tool']> }>;
  ChangeMyPasswordInput: ChangeMyPasswordInput;
  Chat: ResolverTypeWrapper<Chat>;
  ChemicalCleaning: ResolverTypeWrapper<ChemicalCleaning>;
  ChemicalCleaningInput: ChemicalCleaningInput;
  Client: ResolverTypeWrapper<Omit<Client, 'addresses' | 'clientReviews' | 'orders'> & { addresses?: Maybe<Array<ResolversTypes['Address']>>, clientReviews?: Maybe<Array<ResolversTypes['ClientReview']>>, orders?: Maybe<Array<ResolversTypes['Order']>> }>;
  ClientPerDay: ResolverTypeWrapper<ClientPerDay>;
  ClientReview: ResolverTypeWrapper<Omit<ClientReview, 'order'> & { order?: Maybe<ResolversTypes['Order']> }>;
  ClientSignupInput: ClientSignupInput;
  ClientSignupResponse: ResolverTypeWrapper<Omit<ClientSignupResponse, 'user'> & { user: ResolversTypes['Client'] }>;
  ClientSingInResponse: ResolverTypeWrapper<Omit<ClientSingInResponse, 'user'> & { user: ResolversTypes['Client'] }>;
  ClientUpdateMyProfileResponse: ResolverTypeWrapper<Omit<ClientUpdateMyProfileResponse, 'user'> & { user: ResolversTypes['Client'] }>;
  ConnectIdInput: ConnectIdInput;
  Country: ResolverTypeWrapper<Country>;
  CreateAddressByAdminInput: CreateAddressByAdminInput;
  CreateAddressInput: CreateAddressInput;
  CreateAlertInput: CreateAlertInput;
  CreateBasicInput: CreateBasicInput;
  CreateBusyTimeInput: CreateBusyTimeInput;
  CreateCityInput: CreateCityInput;
  CreateClientReviewInput: CreateClientReviewInput;
  CreateCountryInput: CreateCountryInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateMessageInput: CreateMessageInput;
  CreateOrderInput: CreateOrderInput;
  CreateProductInput: CreateProductInput;
  CreateSimpleClientInput: CreateSimpleClientInput;
  CreateSimpleOrderInput: CreateSimpleOrderInput;
  CreateToolInput: CreateToolInput;
  CreateUserInput: CreateUserInput;
  CreateWorkingDayAndHourInput: CreateWorkingDayAndHourInput;
  DailyOrderLimit: ResolverTypeWrapper<DailyOrderLimit>;
  Document: ResolverTypeWrapper<Omit<Document, 'expenses' | 'order'> & { expenses?: Maybe<ResolversTypes['Expense']>, order?: Maybe<ResolversTypes['Order']> }>;
  Employee: ResolverTypeWrapper<Omit<Employee, 'address' | 'assignedOrders' | 'busyTimes' | 'workingDaysAndHours'> & { address: ResolversTypes['Address'], assignedOrders?: Maybe<Array<ResolversTypes['Order']>>, busyTimes?: Maybe<Array<ResolversTypes['BusyTime']>>, workingDaysAndHours?: Maybe<Array<ResolversTypes['WorkingDayAndHour']>> }>;
  Expense: ResolverTypeWrapper<Omit<Expense, 'documents'> & { documents?: Maybe<Array<ResolversTypes['Document']>> }>;
  ExpensePerDay: ResolverTypeWrapper<ExpensePerDay>;
  FilterAddressesInput: FilterAddressesInput;
  FilterBasicInput: FilterBasicInput;
  FilterBusyTimeInput: FilterBusyTimeInput;
  FilterCitiesInput: FilterCitiesInput;
  FilterClientInput: FilterClientInput;
  FilterClientReviewsInput: FilterClientReviewsInput;
  FilterCountriesInput: FilterCountriesInput;
  FilterEmployeeInput: FilterEmployeeInput;
  FilterOrderInput: FilterOrderInput;
  FilterProductsInput: FilterProductsInput;
  FilterToolsInput: FilterToolsInput;
  FilterUserInput: FilterUserInput;
  FilterWorkingDaysAndHoursInput: FilterWorkingDaysAndHoursInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FloatFilterOperatorInput: FloatFilterOperatorInput;
  GetDocumentInput: GetDocumentInput;
  GetSlotsInput: GetSlotsInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFilterOperatorInput: IntFilterOperatorInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Language: Language;
  LanguageInput: LanguageInput;
  Links: ResolverTypeWrapper<Links>;
  LogicalOperator: LogicalOperator;
  LogicalStringsFilterInput: LogicalStringsFilterInput;
  Maid: ResolverTypeWrapper<Maid>;
  MaidInput: MaidInput;
  Message: ResolverTypeWrapper<Message>;
  MessagesResult: ResolverTypeWrapper<MessagesResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Omit<Order, 'address' | 'assignedEmployees' | 'assignedTools' | 'client' | 'document'> & { address: ResolversTypes['Address'], assignedEmployees?: Maybe<Array<Maybe<ResolversTypes['Employee']>>>, assignedTools?: Maybe<Array<Maybe<ResolversTypes['Tool']>>>, client: ResolversTypes['Client'], document?: Maybe<Array<Maybe<ResolversTypes['Document']>>> }>;
  OrderPerDay: ResolverTypeWrapper<OrderPerDay>;
  OrderReview: ResolverTypeWrapper<OrderReview>;
  OrderSpecialityDetail: ResolverTypeWrapper<OrderSpecialityDetail>;
  OrderStatus: OrderStatus;
  PaginationInput: PaginationInput;
  PasswordResetInput: PasswordResetInput;
  PaymentMethod: PaymentMethod;
  PaymentResponse: ResolverTypeWrapper<PaymentResponse>;
  PaymentStatus: PaymentStatus;
  PickedEmployeesForSwapInput: PickedEmployeesForSwapInput;
  PoolType: PoolType;
  Product: ResolverTypeWrapper<Product>;
  ProfitPerDay: ResolverTypeWrapper<ProfitPerDay>;
  Query: ResolverTypeWrapper<{}>;
  ResendVerificationCodeInput: ResendVerificationCodeInput;
  ResponseMessage: ResolverTypeWrapper<ResponseMessage>;
  ResponseMessageWithToken: ResolverTypeWrapper<ResponseMessageWithToken>;
  RevenuePerDay: ResolverTypeWrapper<RevenuePerDay>;
  SendVerificationCodeInput: SendVerificationCodeInput;
  ServiceSubType: ServiceSubType;
  ServiceType: ServiceType;
  SignInCrmResponse: ResolverTypeWrapper<Omit<SignInCrmResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  SignInInput: SignInInput;
  SlotResponse: ResolverTypeWrapper<SlotResponse>;
  Slots: ResolverTypeWrapper<Slots>;
  SortAddressesInput: SortAddressesInput;
  SortBasicInput: SortBasicInput;
  SortBusyTimeInput: SortBusyTimeInput;
  SortCitiesInput: SortCitiesInput;
  SortClientInput: SortClientInput;
  SortClientReviewsInput: SortClientReviewsInput;
  SortCountriesInput: SortCountriesInput;
  SortEmployeeInput: SortEmployeeInput;
  SortOrder: SortOrder;
  SortOrderInput: SortOrderInput;
  SortToolsInput: SortToolsInput;
  SortUserInput: SortUserInput;
  SortWorkingDaysAndHoursInput: SortWorkingDaysAndHoursInput;
  Speciality: Speciality;
  SpecialityDetail: SpecialityDetail;
  StatusType: StatusType;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringFilterOperatorInput: StringFilterOperatorInput;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionMessageSent: SubscriptionMessageSent;
  SuccessMessage: ResolverTypeWrapper<SuccessMessage>;
  SwapEmployeeInput: SwapEmployeeInput;
  SwimmingPoolCleaning: ResolverTypeWrapper<SwimmingPoolCleaning>;
  SwimmingPoolCleaningInput: SwimmingPoolCleaningInput;
  Tool: ResolverTypeWrapper<Omit<Tool, 'busyTimes'> & { busyTimes?: Maybe<Array<Maybe<ResolversTypes['BusyTime']>>> }>;
  ToolDetail: ToolDetail;
  ToolType: ToolType;
  UpdateAddressInput: UpdateAddressInput;
  UpdateAlertInput: UpdateAlertInput;
  UpdateBasicInput: UpdateBasicInput;
  UpdateBusyTimeInput: UpdateBusyTimeInput;
  UpdateCityInput: UpdateCityInput;
  UpdateClientInput: UpdateClientInput;
  UpdateClientPhotoInput: UpdateClientPhotoInput;
  UpdateClientReviewInput: UpdateClientReviewInput;
  UpdateCountryInput: UpdateCountryInput;
  UpdateEmployeeInput: UpdateEmployeeInput;
  UpdateMyMobileInput: UpdateMyMobileInput;
  UpdateOrderInput: UpdateOrderInput;
  UpdateOrderInputByAdmin: UpdateOrderInputByAdmin;
  UpdateProductInput: UpdateProductInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateToolInput: UpdateToolInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkingDayAndHourInput: UpdateWorkingDayAndHourInput;
  User: ResolverTypeWrapper<Omit<User, 'address'> & { address?: Maybe<ResolversTypes['Address']> }>;
  UserObjectResponse: ResolversTypes['Client'] | ResolversTypes['Employee'] | ResolversTypes['User'];
  UserRole: UserRole;
  UserType: UserType;
  VerifyCodeInput: VerifyCodeInput;
  WollyErrorCodes: WollyErrorCodes;
  WorkingDayAndHour: ResolverTypeWrapper<Omit<WorkingDayAndHour, 'employee'> & { employee: ResolversTypes['Employee'] }>;
  WorkingDayAndHourInput: WorkingDayAndHourInput;
  createOrderReviewInput: CreateOrderReviewInput;
  createPaymentInput: CreatePaymentInput;
  deleteBusyTimeInput: DeleteBusyTimeInput;
  filterChartData: FilterChartData;
  filterExpenseData: FilterExpenseData;
  getClientLatestChatIdInput: GetClientLatestChatIdInput;
  sendNotificationByPushTokenInput: SendNotificationByPushTokenInput;
  updateOrderReviewInput: UpdateOrderReviewInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: AddressModel;
  Alert: Alert;
  Amount: Amount;
  ApartmentCleaning: ApartmentCleaning;
  ApartmentCleaningInput: ApartmentCleaningInput;
  ApolloCity: CityModel;
  Boolean: Scalars['Boolean'];
  BooleanFilterOperatorInput: BooleanFilterOperatorInput;
  BusyTime: Omit<BusyTime, 'employee' | 'tool'> & { employee?: Maybe<ResolversParentTypes['Employee']>, tool?: Maybe<ResolversParentTypes['Tool']> };
  ChangeMyPasswordInput: ChangeMyPasswordInput;
  Chat: Chat;
  ChemicalCleaning: ChemicalCleaning;
  ChemicalCleaningInput: ChemicalCleaningInput;
  Client: Omit<Client, 'addresses' | 'clientReviews' | 'orders'> & { addresses?: Maybe<Array<ResolversParentTypes['Address']>>, clientReviews?: Maybe<Array<ResolversParentTypes['ClientReview']>>, orders?: Maybe<Array<ResolversParentTypes['Order']>> };
  ClientPerDay: ClientPerDay;
  ClientReview: Omit<ClientReview, 'order'> & { order?: Maybe<ResolversParentTypes['Order']> };
  ClientSignupInput: ClientSignupInput;
  ClientSignupResponse: Omit<ClientSignupResponse, 'user'> & { user: ResolversParentTypes['Client'] };
  ClientSingInResponse: Omit<ClientSingInResponse, 'user'> & { user: ResolversParentTypes['Client'] };
  ClientUpdateMyProfileResponse: Omit<ClientUpdateMyProfileResponse, 'user'> & { user: ResolversParentTypes['Client'] };
  ConnectIdInput: ConnectIdInput;
  Country: Country;
  CreateAddressByAdminInput: CreateAddressByAdminInput;
  CreateAddressInput: CreateAddressInput;
  CreateAlertInput: CreateAlertInput;
  CreateBasicInput: CreateBasicInput;
  CreateBusyTimeInput: CreateBusyTimeInput;
  CreateCityInput: CreateCityInput;
  CreateClientReviewInput: CreateClientReviewInput;
  CreateCountryInput: CreateCountryInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateMessageInput: CreateMessageInput;
  CreateOrderInput: CreateOrderInput;
  CreateProductInput: CreateProductInput;
  CreateSimpleClientInput: CreateSimpleClientInput;
  CreateSimpleOrderInput: CreateSimpleOrderInput;
  CreateToolInput: CreateToolInput;
  CreateUserInput: CreateUserInput;
  CreateWorkingDayAndHourInput: CreateWorkingDayAndHourInput;
  DailyOrderLimit: DailyOrderLimit;
  Document: Omit<Document, 'expenses' | 'order'> & { expenses?: Maybe<ResolversParentTypes['Expense']>, order?: Maybe<ResolversParentTypes['Order']> };
  Employee: Omit<Employee, 'address' | 'assignedOrders' | 'busyTimes' | 'workingDaysAndHours'> & { address: ResolversParentTypes['Address'], assignedOrders?: Maybe<Array<ResolversParentTypes['Order']>>, busyTimes?: Maybe<Array<ResolversParentTypes['BusyTime']>>, workingDaysAndHours?: Maybe<Array<ResolversParentTypes['WorkingDayAndHour']>> };
  Expense: Omit<Expense, 'documents'> & { documents?: Maybe<Array<ResolversParentTypes['Document']>> };
  ExpensePerDay: ExpensePerDay;
  FilterAddressesInput: FilterAddressesInput;
  FilterBasicInput: FilterBasicInput;
  FilterBusyTimeInput: FilterBusyTimeInput;
  FilterCitiesInput: FilterCitiesInput;
  FilterClientInput: FilterClientInput;
  FilterClientReviewsInput: FilterClientReviewsInput;
  FilterCountriesInput: FilterCountriesInput;
  FilterEmployeeInput: FilterEmployeeInput;
  FilterOrderInput: FilterOrderInput;
  FilterProductsInput: FilterProductsInput;
  FilterToolsInput: FilterToolsInput;
  FilterUserInput: FilterUserInput;
  FilterWorkingDaysAndHoursInput: FilterWorkingDaysAndHoursInput;
  Float: Scalars['Float'];
  FloatFilterOperatorInput: FloatFilterOperatorInput;
  GetDocumentInput: GetDocumentInput;
  GetSlotsInput: GetSlotsInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntFilterOperatorInput: IntFilterOperatorInput;
  JSON: Scalars['JSON'];
  LanguageInput: LanguageInput;
  Links: Links;
  LogicalStringsFilterInput: LogicalStringsFilterInput;
  Maid: Maid;
  MaidInput: MaidInput;
  Message: Message;
  MessagesResult: MessagesResult;
  Mutation: {};
  Order: Omit<Order, 'address' | 'assignedEmployees' | 'assignedTools' | 'client' | 'document'> & { address: ResolversParentTypes['Address'], assignedEmployees?: Maybe<Array<Maybe<ResolversParentTypes['Employee']>>>, assignedTools?: Maybe<Array<Maybe<ResolversParentTypes['Tool']>>>, client: ResolversParentTypes['Client'], document?: Maybe<Array<Maybe<ResolversParentTypes['Document']>>> };
  OrderPerDay: OrderPerDay;
  OrderReview: OrderReview;
  OrderSpecialityDetail: OrderSpecialityDetail;
  PaginationInput: PaginationInput;
  PasswordResetInput: PasswordResetInput;
  PaymentResponse: PaymentResponse;
  PickedEmployeesForSwapInput: PickedEmployeesForSwapInput;
  Product: Product;
  ProfitPerDay: ProfitPerDay;
  Query: {};
  ResendVerificationCodeInput: ResendVerificationCodeInput;
  ResponseMessage: ResponseMessage;
  ResponseMessageWithToken: ResponseMessageWithToken;
  RevenuePerDay: RevenuePerDay;
  SendVerificationCodeInput: SendVerificationCodeInput;
  SignInCrmResponse: Omit<SignInCrmResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  SignInInput: SignInInput;
  SlotResponse: SlotResponse;
  Slots: Slots;
  SortAddressesInput: SortAddressesInput;
  SortBasicInput: SortBasicInput;
  SortBusyTimeInput: SortBusyTimeInput;
  SortCitiesInput: SortCitiesInput;
  SortClientInput: SortClientInput;
  SortClientReviewsInput: SortClientReviewsInput;
  SortCountriesInput: SortCountriesInput;
  SortEmployeeInput: SortEmployeeInput;
  SortOrderInput: SortOrderInput;
  SortToolsInput: SortToolsInput;
  SortUserInput: SortUserInput;
  SortWorkingDaysAndHoursInput: SortWorkingDaysAndHoursInput;
  SpecialityDetail: SpecialityDetail;
  String: Scalars['String'];
  StringFilterOperatorInput: StringFilterOperatorInput;
  Subscription: {};
  SubscriptionMessageSent: SubscriptionMessageSent;
  SuccessMessage: SuccessMessage;
  SwapEmployeeInput: SwapEmployeeInput;
  SwimmingPoolCleaning: SwimmingPoolCleaning;
  SwimmingPoolCleaningInput: SwimmingPoolCleaningInput;
  Tool: Omit<Tool, 'busyTimes'> & { busyTimes?: Maybe<Array<Maybe<ResolversParentTypes['BusyTime']>>> };
  ToolDetail: ToolDetail;
  UpdateAddressInput: UpdateAddressInput;
  UpdateAlertInput: UpdateAlertInput;
  UpdateBasicInput: UpdateBasicInput;
  UpdateBusyTimeInput: UpdateBusyTimeInput;
  UpdateCityInput: UpdateCityInput;
  UpdateClientInput: UpdateClientInput;
  UpdateClientPhotoInput: UpdateClientPhotoInput;
  UpdateClientReviewInput: UpdateClientReviewInput;
  UpdateCountryInput: UpdateCountryInput;
  UpdateEmployeeInput: UpdateEmployeeInput;
  UpdateMyMobileInput: UpdateMyMobileInput;
  UpdateOrderInput: UpdateOrderInput;
  UpdateOrderInputByAdmin: UpdateOrderInputByAdmin;
  UpdateProductInput: UpdateProductInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateToolInput: UpdateToolInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkingDayAndHourInput: UpdateWorkingDayAndHourInput;
  User: Omit<User, 'address'> & { address?: Maybe<ResolversParentTypes['Address']> };
  UserObjectResponse: ResolversParentTypes['Client'] | ResolversParentTypes['Employee'] | ResolversParentTypes['User'];
  VerifyCodeInput: VerifyCodeInput;
  WorkingDayAndHour: Omit<WorkingDayAndHour, 'employee'> & { employee: ResolversParentTypes['Employee'] };
  WorkingDayAndHourInput: WorkingDayAndHourInput;
  createOrderReviewInput: CreateOrderReviewInput;
  createPaymentInput: CreatePaymentInput;
  deleteBusyTimeInput: DeleteBusyTimeInput;
  filterChartData: FilterChartData;
  filterExpenseData: FilterExpenseData;
  getClientLatestChatIdInput: GetClientLatestChatIdInput;
  sendNotificationByPushTokenInput: SendNotificationByPushTokenInput;
  updateOrderReviewInput: UpdateOrderReviewInput;
}>;

export type AddressResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  apartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['ApolloCity'], ParentType, ContextType>;
  cityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  entrance?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  floor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlertResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AlertType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApartmentCleaningResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ApartmentCleaning'] = ResolversParentTypes['ApartmentCleaning']> = ResolversObject<{
  area?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  balconyArea?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bathroom?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bedroom?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cabinet?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  clothesWashing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  curtains?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fridge?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kitchen?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  kitchenInside?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  livingRoom?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  oven?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  petExists?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  premiumLiquids?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  studio?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wardrobe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApolloCityResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ApolloCity'] = ResolversParentTypes['ApolloCity']> = ResolversObject<{
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusyTimeResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['BusyTime'] = ResolversParentTypes['BusyTime']> = ResolversObject<{
  busyFrom?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  busyTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  daysInMonth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tool?: Resolver<Maybe<ResolversTypes['Tool']>, ParentType, ContextType>;
  unavailableFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unavailableTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChatResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = ResolversObject<{
  chatUUID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guestClientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChemicalCleaningResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ChemicalCleaning'] = ResolversParentTypes['ChemicalCleaning']> = ResolversObject<{
  armchair?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  carpet?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fiveSeaterSofa?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fourSeaterSofa?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mattress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sixSeaterSofa?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  softChair?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  threeSeaterSofa?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  twoSeaterSofa?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClientResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = ResolversObject<{
  addresses?: Resolver<Maybe<Array<ResolversTypes['Address']>>, ParentType, ContextType>;
  birthDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientReviews?: Resolver<Maybe<Array<ResolversTypes['ClientReview']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<ResolversTypes['Language'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notificationsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pushToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  smsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClientPerDayResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ClientPerDay'] = ResolversParentTypes['ClientPerDay']> = ResolversObject<{
  client?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClientReviewResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ClientReview'] = ResolversParentTypes['ClientReview']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClientSignupResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ClientSignupResponse'] = ResolversParentTypes['ClientSignupResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClientSingInResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ClientSingInResponse'] = ResolversParentTypes['ClientSingInResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClientUpdateMyProfileResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ClientUpdateMyProfileResponse'] = ResolversParentTypes['ClientUpdateMyProfileResponse']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountryResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DailyOrderLimitResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['DailyOrderLimit'] = ResolversParentTypes['DailyOrderLimit']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DocumentResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expenses?: Resolver<Maybe<ResolversTypes['Expense']>, ParentType, ContextType>;
  expensesId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EmployeeResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = ResolversObject<{
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  assignedOrders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  busyTimes?: Resolver<Maybe<Array<ResolversTypes['BusyTime']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emergencyContact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isTeamLead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mobile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pushToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  salary?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  speakingLanguages?: Resolver<Maybe<Array<ResolversTypes['Language']>>, ParentType, ContextType>;
  specialities?: Resolver<Array<ResolversTypes['Speciality']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workingDaysAndHours?: Resolver<Maybe<Array<ResolversTypes['WorkingDayAndHour']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExpenseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Expense'] = ResolversParentTypes['Expense']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  documents?: Resolver<Maybe<Array<ResolversTypes['Document']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExpensePerDayResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ExpensePerDay'] = ResolversParentTypes['ExpensePerDay']> = ResolversObject<{
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expense?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LinksResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Links'] = ResolversParentTypes['Links']> = ResolversObject<{
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaidResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Maid'] = ResolversParentTypes['Maid']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hours?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  chatUUID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentByClientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentBySupportId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessagesResultResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['MessagesResult'] = ResolversParentTypes['MessagesResult']> = ResolversObject<{
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  callBack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelOrder?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationCancelOrderArgs, 'id'>>;
  cancelSimpleOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCancelSimpleOrderArgs, 'id'>>;
  changeMyPassword?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, Partial<MutationChangeMyPasswordArgs>>;
  clientSignUp?: Resolver<ResolversTypes['ClientSignupResponse'], ParentType, ContextType, RequireFields<MutationClientSignUpArgs, 'data' | 'language'>>;
  createAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'data'>>;
  createAddressByAdmin?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<MutationCreateAddressByAdminArgs, 'data'>>;
  createAlert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<MutationCreateAlertArgs, 'data'>>;
  createBusyTime?: Resolver<Maybe<ResolversTypes['BusyTime']>, ParentType, ContextType, RequireFields<MutationCreateBusyTimeArgs, 'data'>>;
  createCity?: Resolver<Maybe<ResolversTypes['ApolloCity']>, ParentType, ContextType, RequireFields<MutationCreateCityArgs, 'data'>>;
  createClientReview?: Resolver<Maybe<ResolversTypes['ClientReview']>, ParentType, ContextType, RequireFields<MutationCreateClientReviewArgs, 'data'>>;
  createCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<MutationCreateCountryArgs, 'data'>>;
  createDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationCreateDocumentArgs, 'data'>>;
  createEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationCreateEmployeeArgs, 'data'>>;
  createExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, 'data'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'data'>>;
  createOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'data'>>;
  createOrderReview?: Resolver<Maybe<ResolversTypes['OrderReview']>, ParentType, ContextType, RequireFields<MutationCreateOrderReviewArgs, 'data'>>;
  createPayment?: Resolver<Maybe<ResolversTypes['PaymentResponse']>, ParentType, ContextType, RequireFields<MutationCreatePaymentArgs, 'data'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'data'>>;
  createSimpleClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationCreateSimpleClientArgs, 'input'>>;
  createSimpleOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateSimpleOrderArgs, 'data'>>;
  createTool?: Resolver<Maybe<ResolversTypes['Tool']>, ParentType, ContextType, RequireFields<MutationCreateToolArgs, 'data'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createWorkingDayAndHour?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationCreateWorkingDayAndHourArgs, 'data'>>;
  deleteAddress?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteAddressArgs, 'id'>>;
  deleteAlert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<MutationDeleteAlertArgs, 'alertId'>>;
  deleteBusyTime?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteBusyTimeArgs, 'data'>>;
  deleteCity?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteCityArgs, 'id'>>;
  deleteClient?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'id'>>;
  deleteClientReview?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteClientReviewArgs, 'id'>>;
  deleteCountry?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteCountryArgs, 'code'>>;
  deleteEmployee?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteEmployeeArgs, 'id'>>;
  deleteOrderReview?: Resolver<Maybe<ResolversTypes['OrderReview']>, ParentType, ContextType, RequireFields<MutationDeleteOrderReviewArgs, 'id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteSimpleOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationDeleteSimpleOrderArgs, 'id'>>;
  deleteTool?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteToolArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteWorkingDayAndHour?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationDeleteWorkingDayAndHourArgs, 'id'>>;
  pickedEmployeesForSwap?: Resolver<Maybe<Array<ResolversTypes['Employee']>>, ParentType, ContextType, RequireFields<MutationPickedEmployeesForSwapArgs, 'data'>>;
  resendVerificationCode?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationResendVerificationCodeArgs, 'data' | 'language'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['UserObjectResponse']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'language'>>;
  sendNotificationByPushToken?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationSendNotificationByPushTokenArgs, 'data'>>;
  sendVerificationCode?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationSendVerificationCodeArgs, 'language'>>;
  signin?: Resolver<Maybe<ResolversTypes['ClientSingInResponse']>, ParentType, ContextType, RequireFields<MutationSigninArgs, 'data' | 'language'>>;
  signinCrm?: Resolver<Maybe<ResolversTypes['SignInCrmResponse']>, ParentType, ContextType, RequireFields<MutationSigninCrmArgs, 'data' | 'language'>>;
  signout?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType>;
  swapEmployees?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationSwapEmployeesArgs, 'data'>>;
  updateAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'data'>>;
  updateAlert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<MutationUpdateAlertArgs, 'data'>>;
  updateBusyTime?: Resolver<Maybe<ResolversTypes['BusyTime']>, ParentType, ContextType, RequireFields<MutationUpdateBusyTimeArgs, 'data'>>;
  updateCity?: Resolver<Maybe<ResolversTypes['ApolloCity']>, ParentType, ContextType, RequireFields<MutationUpdateCityArgs, 'data'>>;
  updateClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'data'>>;
  updateClientPhoto?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationUpdateClientPhotoArgs, 'data'>>;
  updateClientReview?: Resolver<Maybe<ResolversTypes['ClientReview']>, ParentType, ContextType, RequireFields<MutationUpdateClientReviewArgs, 'data'>>;
  updateCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<MutationUpdateCountryArgs, 'data'>>;
  updateEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationUpdateEmployeeArgs, 'data'>>;
  updateMyMobile?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationUpdateMyMobileArgs, 'data'>>;
  updateMyProfile?: Resolver<ResolversTypes['ClientUpdateMyProfileResponse'], ParentType, ContextType, RequireFields<MutationUpdateMyProfileArgs, 'data'>>;
  updateOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationUpdateOrderArgs, 'data'>>;
  updateOrderByAdmin?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationUpdateOrderByAdminArgs, 'data'>>;
  updateOrderReview?: Resolver<Maybe<ResolversTypes['OrderReview']>, ParentType, ContextType, RequireFields<MutationUpdateOrderReviewArgs, 'data'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'data'>>;
  updateTool?: Resolver<Maybe<ResolversTypes['Tool']>, ParentType, ContextType, RequireFields<MutationUpdateToolArgs, 'data'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data' | 'language'>>;
  updateWorkingDayAndHour?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationUpdateWorkingDayAndHourArgs, 'data'>>;
  verifyCode?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationVerifyCodeArgs, 'data' | 'language'>>;
}>;

export type OrderResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  apartmentCleaning?: Resolver<Maybe<ResolversTypes['ApartmentCleaning']>, ParentType, ContextType>;
  assignedEmployees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Employee']>>>, ParentType, ContextType>;
  assignedTools?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tool']>>>, ParentType, ContextType>;
  chemicalCleaning?: Resolver<Maybe<ResolversTypes['ChemicalCleaning']>, ParentType, ContextType>;
  cleanersQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  closedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  document?: Resolver<Maybe<Array<Maybe<ResolversTypes['Document']>>>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expense?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  liveStreamRooms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maid?: Resolver<Maybe<ResolversTypes['Maid']>, ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['PaymentMethod']>, ParentType, ContextType>;
  paymentStatus?: Resolver<Maybe<ResolversTypes['PaymentStatus']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seenByManager?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  serviceSubType?: Resolver<Maybe<ResolversTypes['ServiceSubType']>, ParentType, ContextType>;
  serviceType?: Resolver<Maybe<ResolversTypes['ServiceType']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  swimmingPoolCleaning?: Resolver<Maybe<ResolversTypes['SwimmingPoolCleaning']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderPerDayResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['OrderPerDay'] = ResolversParentTypes['OrderPerDay']> = ResolversObject<{
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderReviewResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['OrderReview'] = ResolversParentTypes['OrderReview']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderSpecialityDetailResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['OrderSpecialityDetail'] = ResolversParentTypes['OrderSpecialityDetail']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantityNeeded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  specialityNeededId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['PaymentResponse'] = ResolversParentTypes['PaymentResponse']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  developerMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  httpStatusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  links?: Resolver<Maybe<Array<Maybe<ResolversTypes['Links']>>>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preAuth?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  recId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfitPerDayResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ProfitPerDay'] = ResolversParentTypes['ProfitPerDay']> = ResolversObject<{
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  checkOrderLimitForDay?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckOrderLimitForDayArgs, 'date'>>;
  getAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryGetAddressArgs, 'id'>>;
  getAlert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<QueryGetAlertArgs, 'id'>>;
  getAllAddresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType, Partial<QueryGetAllAddressesArgs>>;
  getAllAlerts?: Resolver<Maybe<Array<ResolversTypes['Alert']>>, ParentType, ContextType>;
  getAllBusyTimes?: Resolver<Maybe<Array<Maybe<ResolversTypes['BusyTime']>>>, ParentType, ContextType, Partial<QueryGetAllBusyTimesArgs>>;
  getAllChat?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType, Partial<QueryGetAllChatArgs>>;
  getAllCities?: Resolver<Maybe<Array<ResolversTypes['ApolloCity']>>, ParentType, ContextType, Partial<QueryGetAllCitiesArgs>>;
  getAllClients?: Resolver<Maybe<Array<ResolversTypes['Client']>>, ParentType, ContextType, Partial<QueryGetAllClientsArgs>>;
  getAllCountries?: Resolver<Maybe<Array<ResolversTypes['Country']>>, ParentType, ContextType, Partial<QueryGetAllCountriesArgs>>;
  getAllCrmOrders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType, Partial<QueryGetAllCrmOrdersArgs>>;
  getAllEmployees?: Resolver<Maybe<Array<ResolversTypes['Employee']>>, ParentType, ContextType, Partial<QueryGetAllEmployeesArgs>>;
  getAllOrderReviews?: Resolver<Maybe<Array<ResolversTypes['OrderReview']>>, ParentType, ContextType, RequireFields<QueryGetAllOrderReviewsArgs, 'id'>>;
  getAllOrders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType, Partial<QueryGetAllOrdersArgs>>;
  getAllProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, Partial<QueryGetAllProductsArgs>>;
  getAllTools?: Resolver<Maybe<Array<ResolversTypes['Tool']>>, ParentType, ContextType, Partial<QueryGetAllToolsArgs>>;
  getAllUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryGetAllUsersArgs>>;
  getAllWorkingDaysAndHours?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkingDayAndHour']>>>, ParentType, ContextType, Partial<QueryGetAllWorkingDaysAndHoursArgs>>;
  getBusyTime?: Resolver<Maybe<ResolversTypes['BusyTime']>, ParentType, ContextType, RequireFields<QueryGetBusyTimeArgs, 'id'>>;
  getCity?: Resolver<Maybe<ResolversTypes['ApolloCity']>, ParentType, ContextType, RequireFields<QueryGetCityArgs, 'id'>>;
  getClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryGetClientArgs, 'id'>>;
  getClientAllReviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClientReview']>>>, ParentType, ContextType, RequireFields<QueryGetClientAllReviewsArgs, 'clientId'>>;
  getClientLatestChatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetClientLatestChatIdArgs, 'data'>>;
  getClientReview?: Resolver<Maybe<ResolversTypes['ClientReview']>, ParentType, ContextType, RequireFields<QueryGetClientReviewArgs, 'id'>>;
  getClientsChart?: Resolver<Array<ResolversTypes['ClientPerDay']>, ParentType, ContextType, RequireFields<QueryGetClientsChartArgs, 'data'>>;
  getCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryGetCountryArgs, 'code'>>;
  getDocument?: Resolver<Maybe<Array<ResolversTypes['Document']>>, ParentType, ContextType, Partial<QueryGetDocumentArgs>>;
  getEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryGetEmployeeArgs, 'id'>>;
  getExpense?: Resolver<Maybe<Array<ResolversTypes['Expense']>>, ParentType, ContextType, Partial<QueryGetExpenseArgs>>;
  getExpensesChart?: Resolver<Array<ResolversTypes['ExpensePerDay']>, ParentType, ContextType, RequireFields<QueryGetExpensesChartArgs, 'data'>>;
  getMessages?: Resolver<ResolversTypes['MessagesResult'], ParentType, ContextType, Partial<QueryGetMessagesArgs>>;
  getOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryGetOrderArgs, 'id'>>;
  getOrderReview?: Resolver<Maybe<ResolversTypes['OrderReview']>, ParentType, ContextType, RequireFields<QueryGetOrderReviewArgs, 'id'>>;
  getOrdersChart?: Resolver<Array<ResolversTypes['OrderPerDay']>, ParentType, ContextType, RequireFields<QueryGetOrdersChartArgs, 'data'>>;
  getProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'id'>>;
  getProfit?: Resolver<Array<ResolversTypes['ProfitPerDay']>, ParentType, ContextType, RequireFields<QueryGetProfitArgs, 'data'>>;
  getRevenue?: Resolver<Array<ResolversTypes['RevenuePerDay']>, ParentType, ContextType, RequireFields<QueryGetRevenueArgs, 'data'>>;
  getSlots?: Resolver<Maybe<ResolversTypes['Slots']>, ParentType, ContextType, Partial<QueryGetSlotsArgs>>;
  getTbcToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getTool?: Resolver<Maybe<ResolversTypes['Tool']>, ParentType, ContextType, RequireFields<QueryGetToolArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getWorkingDayAndHour?: Resolver<Maybe<ResolversTypes['WorkingDayAndHour']>, ParentType, ContextType, RequireFields<QueryGetWorkingDayAndHourArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryMeArgs>>;
}>;

export type ResponseMessageResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseMessageWithTokenResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['ResponseMessageWithToken'] = ResolversParentTypes['ResponseMessageWithToken']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RevenuePerDayResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['RevenuePerDay'] = ResolversParentTypes['RevenuePerDay']> = ResolversObject<{
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignInCrmResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['SignInCrmResponse'] = ResolversParentTypes['SignInCrmResponse']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SlotResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['SlotResponse'] = ResolversParentTypes['SlotResponse']> = ResolversObject<{
  employeeIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toolIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SlotsResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Slots'] = ResolversParentTypes['Slots']> = ResolversObject<{
  availableSlots?: Resolver<Maybe<Array<Maybe<ResolversTypes['SlotResponse']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  messageSent?: SubscriptionResolver<ResolversTypes['Message'], "messageSent", ParentType, ContextType, RequireFields<SubscriptionMessageSentArgs, 'data'>>;
  paymentStatusUpdated?: SubscriptionResolver<ResolversTypes['String'], "paymentStatusUpdated", ParentType, ContextType, RequireFields<SubscriptionPaymentStatusUpdatedArgs, 'paymentId'>>;
}>;

export type SuccessMessageResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SwimmingPoolCleaningResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['SwimmingPoolCleaning'] = ResolversParentTypes['SwimmingPoolCleaning']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poolType?: Resolver<ResolversTypes['PoolType'], ParentType, ContextType>;
  squareMeter?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ToolResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Tool'] = ResolversParentTypes['Tool']> = ResolversObject<{
  busyTimes?: Resolver<Maybe<Array<Maybe<ResolversTypes['BusyTime']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toolType?: Resolver<ResolversTypes['ToolType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['Language'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mobile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notificationsEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pushToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  smsEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserObjectResponseResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['UserObjectResponse'] = ResolversParentTypes['UserObjectResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Client' | 'Employee' | 'User', ParentType, ContextType>;
}>;

export type WorkingDayAndHourResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['WorkingDayAndHour'] = ResolversParentTypes['WorkingDayAndHour']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endWeekday?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startWeekday?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IPrismaContext> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  Alert?: AlertResolvers<ContextType>;
  ApartmentCleaning?: ApartmentCleaningResolvers<ContextType>;
  ApolloCity?: ApolloCityResolvers<ContextType>;
  BusyTime?: BusyTimeResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  ChemicalCleaning?: ChemicalCleaningResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  ClientPerDay?: ClientPerDayResolvers<ContextType>;
  ClientReview?: ClientReviewResolvers<ContextType>;
  ClientSignupResponse?: ClientSignupResponseResolvers<ContextType>;
  ClientSingInResponse?: ClientSingInResponseResolvers<ContextType>;
  ClientUpdateMyProfileResponse?: ClientUpdateMyProfileResponseResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  DailyOrderLimit?: DailyOrderLimitResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  Employee?: EmployeeResolvers<ContextType>;
  Expense?: ExpenseResolvers<ContextType>;
  ExpensePerDay?: ExpensePerDayResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Links?: LinksResolvers<ContextType>;
  Maid?: MaidResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessagesResult?: MessagesResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderPerDay?: OrderPerDayResolvers<ContextType>;
  OrderReview?: OrderReviewResolvers<ContextType>;
  OrderSpecialityDetail?: OrderSpecialityDetailResolvers<ContextType>;
  PaymentResponse?: PaymentResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProfitPerDay?: ProfitPerDayResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseMessage?: ResponseMessageResolvers<ContextType>;
  ResponseMessageWithToken?: ResponseMessageWithTokenResolvers<ContextType>;
  RevenuePerDay?: RevenuePerDayResolvers<ContextType>;
  SignInCrmResponse?: SignInCrmResponseResolvers<ContextType>;
  SlotResponse?: SlotResponseResolvers<ContextType>;
  Slots?: SlotsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SuccessMessage?: SuccessMessageResolvers<ContextType>;
  SwimmingPoolCleaning?: SwimmingPoolCleaningResolvers<ContextType>;
  Tool?: ToolResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserObjectResponse?: UserObjectResponseResolvers<ContextType>;
  WorkingDayAndHour?: WorkingDayAndHourResolvers<ContextType>;
}>;


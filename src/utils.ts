import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express';
// @ts-ignore
import { combineResolvers, skip as next } from 'graphql-resolvers';
import formatMessage from './localization/intl';

import validations from './utils/validations';

import { GraphQLError, GraphQLFormattedError } from 'graphql';
// import { UserRole } from './modules/user/types';
import { ContextType } from 'services/createServer';
import { rule } from 'graphql-shield';
import { UserRole } from './graphql/generated/graphql';
import { trackError } from './services/sentry';

const { Admin, Manager } = UserRole;
// @ts-ignore
export const isAuthenticated = (_, _args, { req }) => {
  return req.userId ? next : new AuthenticationError('You are not logged in');
};

export const newIsAuthenticated = rule({ cache: 'contextual' })(
  (parent: unknown, args: unknown, { req }: ContextType) => {
    return req.userId ? true : new AuthenticationError('You are not logged in');
  },
);

export const newIsManager = rule({ cache: 'contextual' })(
  (parent: unknown, args: unknown, { req: { userId, meCrmUser, language } }: ContextType) => {
    if (!meCrmUser) {
      throw new Error(formatMessage('KA', 'common.unknownError'));
    }
    return userId && (meCrmUser.role === Admin || meCrmUser.role === Manager)
      ? true
      : new ForbiddenError('Not authorized as manager.');
  },
);

export const newIsAdmin = rule({ cache: 'contextual' })(
  (
    parent: unknown,
    args: unknown,
    {
      req: {
        userId,
        meCrmUser: { role },
      },
    }: ContextType,
  ) => {
    return userId && role === Admin ? true : new ForbiddenError('Not authorized as admin.');
  },
);

export const isAdmin = combineResolvers(
  isAuthenticated,
  (
    // @ts-ignore
    _,
    // @ts-ignore
    _args,
    {
      req: {
        // @ts-ignore
        meCrmUser: { role },
      },
    },
  ) => {
    return role === Admin ? next : new ForbiddenError('Not authorized as admin.');
  },
);

// @ts-ignore
export const isManager = combineResolvers(
  isAuthenticated,
  (
    // @ts-ignore
    _,
    // @ts-ignore
    _args,
    {
      req: {
        // @ts-ignore
        meCrmUser: { role },
      },
    },
  ) => {
    return role === Admin || role === Manager ? next : new ForbiddenError('Not authorized as manager.');
  },
);

export const calculateTotal = () => 150;

export const DEFAULT_PAGE = { skip: 0, take: 10 };

export const generateSearchQuery = ({
  filters = {},
  sort,
  pagination,
}: {
  filters?: any;
  sort?: any;
  pagination?: any;
}) => {
  // Assemble filters
  const whereQuery = Object.keys(filters).reduce((acc, currFilter) => {
    // @ts-ignore
    const filterValues = filters[currFilter] || {};
    const [queryOperator]: any = Object.keys(filterValues) || [];
    // if (filterValues.operator && filterValues.key) {
    //   return {
    //     ...acc,
    //     [currFilter]: {
    //       every: {

    //       }
    //     }
    //   }
    // }
    // get the first value, because we should not
    // have two values for example stringValue and intValue
    const value = filterValues[queryOperator];
    return {
      ...acc,
      [currFilter]: {
        [queryOperator]: value,
      },
    };
  }, {});
  // Assemble sorting
  const sortKey = Object.keys(sort || {})[0];
  const sortQuery = sortKey && { orderBy: { [sortKey]: sort[sortKey] } };
  // Assemble pagination
  const { offset: skip, limit: take } = pagination || DEFAULT_PAGE;
  return {
    whereQuery,
    sortQuery,
    skip,
    take,
  };
};

// @TODO replace this filthy validator with AuthGuard middleware if necessary
// @ts-ignore
export const validateInput = (parent, args) => {
  const { id } = args;
  let { data } = args;
  // If mutation then data wont be empty, otherwise id will be populated
  if (data == null) {
    data = { ...(id && { id }) };
  }

  Object.keys(data).map(k => {
    // @ts-ignore
    const { validator, error } = validations[k] || {};
    if (validator && !validator(data)) {
      throw new UserInputError(error, { field: k });
    }
    return true;
  });
};

// @ts-ignore
export const generateRandomNumber = length => {
  const number = Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1));
  return number;
};

// @ts-ignore
export const roundNumber = (value, decimal) => {
  const multiplier = 10 ** decimal || 0;
  return Math.round(value * multiplier) / multiplier;
};

export const formatError = (err: GraphQLFormattedError) => {
  trackError(err);
  if (err.message.startsWith('Database Error: ')) {
    throw new ApolloError('Internal server error');
  }
  // const code: any = err.extensions?.exception?.code;
  // if (code === 'P2015') {
  //   return { message: 'A related record could not be found. ' };
  // } else if (code === 'P2016') {
  //   return { message: 'Record was not found for given ID.' };
  // } else if (code === 'P2002') {
  //   return { message: formatMessage('KA', 'errors.uniqueConstraint') };
  // } else if (code === 'P2014') {
  //   return { message: formatMessage('KA', 'errors.relationViolation') };
  // } else if (code === 'P2025') {
  //   return { message: 'არ მოიძებნა რაც უნდა განახლდეს' };
  // }

  return err;
};

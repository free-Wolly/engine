import { config as configDotenv } from 'dotenv';
import { Client, Language, User } from 'graphql/generated/graphql';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
  case 'development':
    configDotenv({
      path: resolve(__dirname, '../.env.development'),
    });
    break;
  case 'test':
    configDotenv({
      path: resolve(__dirname, '../.env.test'),
    });
    break;
  case 'staging':
    break;
  case 'production':
    break;
  default:
    break;
}

// const throwIfNot = function <T, K extends keyof T>(obj: Partial<T>, prop: K, msg?: string): T[K] {
//   if (obj[prop] === undefined || obj[prop] === null) {
//     throw new Error(msg || `Environment is missing variable ${prop}`);
//   } else {
//     return obj[prop] as T[K];
//   }
// };
// Validate that we have our expected ENV variables defined!
// const ENV_VARIABLES = [
//   'NODE_ENV',
//   'PORT',
//   'APP_SECRET',
//   'SENTRY_DSN',
//   'SUPPORT_EMAIL',
//   'SENDGRID_API_KEY',
//   'API_URL',
//   'SMS_SENDER_API_URL_NEW',
//   'SMS_SENDER_API_KEY_NEW',
//   'APOLLO_KEY',
//   'APOLLO_GRAPH_REF',
//   'APOLLO_SCHEMA_REPORTING',
// ];

// @ts-ignore
// if (process.env.NODE_ENV !== 'production') {
//   ENV_VARIABLES.forEach(v => {
//     throwIfNot(process.env, v);
//   });
// }

export interface IProcessEnv {
  NODE_ENV: string;
  PORT: string;
  APP_SECRET: string;
  SENTRY_DSN: string;
  SUPPORT_EMAIL: string;
  SENDGRID_API_KEY: string;
  API_URL: string;
  SMS_SENDER_API_URL_NEW: string;
  SMS_SENDER_API_KEY_NEW: string;
  APOLLO_KEY: string;
  APOLLO_GRAPH_REF: string;
  APOLLO_SCHEMA_REPORTING: string;
  CALLBACK_URL: string;
  PRIVATE_KEY_ID_FIREBASE: string;
  PRIVATE_KEY_FIREBASE: string;
  CLIENT_ID_FIREBASE: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
  namespace Express {
    export interface Request {
      userId: string;
      meClient: Client;
      meCrmUser: User;
      language: Language;
    }
  }
}

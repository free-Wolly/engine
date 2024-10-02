/* eslint-disable max-classes-per-file */
// // const trackError = require('./sentry');

// const execute = (
//   // func, params
// ) => {
//   // if (__DEV__) {
//   //   // eslint-disable-next-line no-console
//   //   console[func](...params);
//   // }
// };

// export const log = (...params) => {
//   execute('log', params);
// };

// export const info = (...params) => {
//   execute('info', params);
// };

// export const trace = (...params) => {
//   execute('trace', params);
// };

// export const error = (errorParam, ...params) => {
//   // trackError(errorParam);
//   execute('error', params.length ? params : [errorParam]);
// };

const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export class BaseError extends Error {
  // @ts-ignore
  constructor(name, httpCode, description, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    // this.httpCode = httpCode;
    // this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  // @ts-ignore
  constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
    super(name, httpCode, isOperational, description);
  }
}

export class HTTP400Error extends BaseError {
  constructor(description = 'bad request') {
    super('NOT FOUND', HttpStatusCode.BAD_REQUEST, true, description);
  }
}

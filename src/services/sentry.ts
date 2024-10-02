import * as Sentry from "@sentry/node";

// @ts-ignore
export const trackError = (error) => {
  Sentry.captureException(error);
};

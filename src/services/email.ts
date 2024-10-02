import { trackError } from "./sentry";

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const addresses = {
  to: process.env.SUPPORT_EMAIL,
  from: process.env.SUPPORT_EMAIL,
};

// @ts-ignore
export default ({ subject, text, html }) => {
  const message = {
    ...addresses,
    subject,
    text,
    html,
  };
  // @ts-ignore
  sgMail.send(message).catch((error) => {
    trackError(error);
  });
};

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export enum AuthType {
  user = 'user',
  client = 'client',
  employee = 'employee',
}

export interface JwtTokenType {
  userId: string;
  authType: AuthType;
}

dotenv.config({ path: '.env' });

export const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(Sentry.Handlers.errorHandler());

// @ts-ignore
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.use(morgan('combined'));
app.use((_, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
const limiter: any = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});

app.use(limiter);
app.disable('x-powered-by');
app.use(express.static('public'));
app.use(cookieParser());

export default app;

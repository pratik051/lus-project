import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers["x-order-token"]',
      'password',
      '*.password',
      '*.*.password',
      'newPassword',
      '*.newPassword',
      'currentPassword',
      'token',
      '*.token',
      '*.*.token',
      'accessToken',
      '*.accessToken',
      'refreshToken',
      'resetToken',
      'passwordResetToken',
      'cardNumber',
      '*.cardNumber',
      'cvv',
      'cvc',
      '*.cvv',
      '*.cvc',
      'exp',
      'paymentToken',
      'secret',
      '*.secret',
      'clientSecret',
    ],
    remove: true,
  },
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
});

export default logger;

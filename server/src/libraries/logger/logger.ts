import 'dotenv/config';
import pino from 'pino';

const logger = pino({
  level: process.env.PINO_LOG_LEVEL ?? 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ['users.email', 'users.password_hash']
});

export default logger;

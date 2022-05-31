import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

export const LOGGER = pino({level: process.env.LOG_LEVEL || 'debug'});
export const stringTable = require('string-table');

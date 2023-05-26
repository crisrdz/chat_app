import {config} from 'dotenv';

config();
export const PORT = process.env.PORT || 4000;
export const DB_NAME = process.env.DB_NAME;
export const SECRET_KEY = process.env.SECRET_KEY;
export const PRODUCTION = process.env.PRODUCTION || false;
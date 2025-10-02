import dotenv from 'dotenv';
import path from 'path';


const envPath = path.resolve(process.cwd(), '..', '.env');
dotenv.config({ path: envPath });
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;

export const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=${DB_NAME}`;


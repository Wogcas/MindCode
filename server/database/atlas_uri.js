import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DATABASE = process.env.DATABASE;

export const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DATABASE}?retryWrites=true&w=majority&appName=${DB_NAME}`;


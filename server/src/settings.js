import dotenv from 'dotenv';

dotenv.config();
export const connectionString = process.env.DATABASE_URL;
export const googleApplicationCredentials =
  '../web-chat-72b52-firebase-adminsdk-v35ow-45ecac1b2e.json';

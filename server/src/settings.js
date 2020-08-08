import dotenv from 'dotenv';

dotenv.config();
export const connectionString = process.env.DATABASE_URL;
export const googleApplicationCredentials =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

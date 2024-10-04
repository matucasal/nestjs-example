import * as dotenv from 'dotenv';
dotenv.config();

export const COUNTRIES_API_URL =
  process.env.COUNTRIES_API_URL ||
  'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8';

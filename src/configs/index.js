import env from "dotenv";
env.config();

export const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
};
export const port = parseInt(process.env.PORT);
export const image_location = process.env.IMAGE_LOCATION;
export const host = process.env.HOST;
export const jwt_secret_key = process.env.JWT_SECRET_KEY;

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
export const ktp_location = process.env.KTP_LOCATION;
export const host = process.env.HOST;
export const jwt_secret_key = process.env.JWT_SECRET_KEY;
export const email_smtp = process.env.EMAIL_SMTP;
export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;
export const redirect_uri = process.env.REDIRECT_URI;
export const refresh_token = process.env.REFRESH_TOKEN;
export const account_sid_otp = process.env.ACCOUNT_SID_OTP;
export const auth_token_otp = process.env.AUTH_TOKEN_OTP;
export const service_id_otp = process.env.SERVICE_ID_OTP;

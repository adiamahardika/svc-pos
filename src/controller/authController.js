import { uid } from "uid";
import bcrypt from "bcrypt";
import crypto_js from "crypto-js";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  emailCheckRepository,
  registerRepository,
  userCodeCheckRepository,
} from "../repository/authRepository.js";
import jwt from "jsonwebtoken";
import {
  account_sid_otp,
  auth_token_otp,
  client_id,
  client_secret,
  email_smtp,
  host,
  jwt_secret_key,
  redirect_uri,
  refresh_token,
  service_id_otp,
} from "../configs/index.js";
import { compress } from "../helpers/uploadFiles.js";
import { getDetailMerchantRepository } from "../repository/merchantRepository.js";
import {
  getDetailUserRepository,
  updateVerifyEmail,
  updateVerifyOtp,
} from "../repository/userRepository.js";
import twilio from "twilio";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const client = new twilio(account_sid_otp, auth_token_otp);

export const register = async (request, response) => {
  try {
    await compress(request.file.path);
    const date = new Date();
    const salt_rounds = 10;

    const hash = bcrypt.hashSync(request.body.password, salt_rounds);

    const request_data = {
      id: uid(6),
      name: request.body.name,
      email: request.body.email.toLowerCase(),
      role_id: request.body.role_id,
      ktp: request.file.filename,
      no_hp: request.body.no_hp,
      hash_password: hash,
      is_active: "true",
      is_otp_validate: "false",
      is_email_validate: "false",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };

    const email_check = await emailCheckRepository(request_data);

    if (email_check.rows.length === 0) {
      const result = await registerRepository(request_data);

      result.rows[0] = {
        ...result.rows[0],
        ktp: host + "ktp/" + result.rows[0].ktp,
      };
      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(response, 400, error_RC, "Email anda sudah terdaftar!");
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const login = async (request, response) => {
  try {
    const request_data = {
      email: request.body.email,
      password: request.body.password,
    };

    let user_check = null;
    const email_check = await emailCheckRepository(request_data);
    const user_code_check = await userCodeCheckRepository(request_data);

    if (email_check.rows.length > 0) {
      user_check = email_check;
    } else if (user_code_check.rows.length > 0) {
      user_check = user_code_check;
    }

    if (
      user_check &&
      user_check !== null &&
      user_check.rows[0].is_active === "true"
    ) {
      const match = await bcrypt.compare(
        request_data.password,
        user_check.rows[0].hash_password
      );
      if (match) {
        let user_data = user_check.rows[0];
        const signature_key = crypto_js
          .MD5(user_data.merchant_id + user_data.secret_key)
          .toString();
        const token = jwt.sign(
          { merchant_id: user_data.merchant_id, signature_key: signature_key },
          jwt_secret_key,
          {
            expiresIn: "1h",
          }
        );

        user_data = {
          ...user_data,
          token: token,
          ktp: user_data.ktp ? host + "ktp/" + user_data.ktp : null,
        };

        delete user_data.secret_key;
        delete user_data.is_active;
        delete user_data.hash_password;
        delete user_data.created_at;
        delete user_data.created_by;
        delete user_data.updated_at;
        delete user_data.updated_by;

        user_check.rows[0] = user_data;

        standardResponse(response, 200, success_RC, SUCCESS, user_check);
      } else {
        standardResponse(response, 400, error_RC, "Password anda salah!");
      }
    } else if (user_check && user_check.rows[0].is_active !== "true") {
      standardResponse(response, 401, error_RC, "Akun ini sudah tidak aktif!");
    } else {
      standardResponse(
        response,
        400,
        error_RC,
        "Email atau kode user anda salah!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const authentication = (request, response, next) => {
  const header_token = request.get("token");
  if (!header_token) {
    standardResponse(response, 401, error_RC, "Please provide your token!");
  } else {
    jwt.verify(header_token, jwt_secret_key, (error, decoded) => {
      if (
        error &&
        error.name === "TokenExpiredError" &&
        request.route.path !== "/refresh-token"
      ) {
        standardResponse(response, 401, error_RC, "Your token has expired!");
      } else if (error && error.name === "JsonWebTokenError") {
        standardResponse(response, 401, error_RC, "Your token is invalid!");
      } else if (
        (decoded && !decoded.merchant_id) ||
        (decoded && !decoded.signature_key)
      ) {
        standardResponse(response, 401, error_RC, "Error to read your token!");
      } else {
        next();
      }
    });
  }
};

export const authorization = async (request, response, next) => {
  const signature_key = request.get("signature-key");
  const header_token = request.get("token");
  if (!signature_key) {
    standardResponse(
      response,
      401,
      error_RC,
      "Please provide your signature key!"
    );
  } else {
    const decode = jwt.decode(header_token);
    const merchant_id = await getDetailMerchantRepository(decode.merchant_id);

    const generate_signature_key = crypto_js
      .MD5(merchant_id.rows[0].id + merchant_id.rows[0].secret_key)
      .toString();

    if (signature_key !== generate_signature_key) {
      standardResponse(
        response,
        401,
        error_RC,
        "Your signature key is invalid!"
      );
    } else {
      next();
    }
  }
};

export const refreshToken = async (request, response) => {
  try {
    const signature_key = request.get("signature-key");
    const header_token = request.get("token");
    const decode = jwt.decode(header_token);
    const merchant_id = await getDetailMerchantRepository(decode.merchant_id);

    const token = jwt.sign(
      { merchant_id: merchant_id.rows[0].id, signature_key: signature_key },
      jwt_secret_key,
      {
        expiresIn: "1h",
      }
    );

    const result = {
      rows: [
        {
          token: token,
        },
      ],
    };
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const verifyEmail = async (request, response) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri
    );
    oAuth2Client.setCredentials({ refresh_token: refresh_token });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: email_smtp,
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token,
        accessToken: accessToken,
      },
    });

    const user_data = await getDetailUserRepository(request.body.user_id);
    const token = jwt.sign({ id: user_data.rows[0].id }, jwt_secret_key, {
      expiresIn: "1h",
    });
    const now = new Date();
    const expired_link_time = now.setHours(now.getHours() + 1);
    const url = `${host}auth/confirm-email/${token}`;
    const mail_options = {
      from: `"Warkatpos App" <${email_smtp}>`, // sender address
      to: request.body.email,
      subject: "Verifikasi Email",
      html: `<div style="font-family: 'Poppins', sans-serif; font-size:16px; text-align:center; font-weight: 500;">
      <p style="color:black;">Silahkan klik tombol berikut untuk verifikasi email anda:</p> 
      <button style="
        background-color: #ff0025;
        padding: 8px;
        font-size: 16px;
        border-radius: 6px;
        border-width: 2px;
        border-color: white;
        border-style: solid;
      ">
      <a href="${url}" style="text-decoration: none; color: white">Verifikasi email</a>
    </button>
    <p style="font-size:14px; font-weight: 400; color:black;">Note: Link akan kadaluarsa 1 jam setelah link ini dikirim!</p>
    </div>`, // html body
    };

    let info = await transporter.sendMail(mail_options);
    const result = {
      rows: [
        {
          message: `Message sent: ${info.messageId}`,
        },
      ],
    };
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const confirmEmail = async (request, response) => {
  try {
    const token = request.params.token;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const path = __dirname.split("controller");

    jwt.verify(token, jwt_secret_key, async (error, decoded) => {
      if (error && error.name === "TokenExpiredError") {
        return response
          .status(200)
          .sendFile(join(path[0] + "/web/expiredEmail.html"));
      } else if (error && error.name === "JsonWebTokenError") {
        return response
          .status(200)
          .sendFile(join(path[0] + "/web/invalidEmail.html"));
      } else {
        const request_data = {
          is_email_validate: "true",
        };
        await updateVerifyEmail(request_data, decoded.id);
        return response
          .status(200)
          .sendFile(join(path[0] + "/web/successEmail.html"));
      }
    });
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const verifyPhoneNumber = async (request, response) => {
  try {
    let verifiy = await client.verify
      .services(service_id_otp)
      .verifications.create({
        to: `+${request.body.no_hp}`,
        channel: "sms",
      });
    const result = {
      rows: [verifiy],
    };
    if (
      verifiy.lookup.carrier.error_code === null ||
      !verifiy.lookup.carrier.error_code
    ) {
      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(response, 400, success_RC, "Nomor anda salah");
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 200, success_RC, "Nomor anda salah");
  }
};

export const confirmPhoneNumber = async (request, response) => {
  try {
    await client.verify
      .services(service_id_otp)
      .verificationChecks.create({
        to: `+${request.body.no_hp}`,
        code: request.body.otp,
      })
      .then(async (data) => {
        if (data.status === "approved") {
          const user_id = request.body.user_id;
          const result = {
            rows: [data],
          };
          const request_data = {
            is_otp_validate: "true",
          };
          await updateVerifyOtp(request_data, user_id);
          standardResponse(response, 200, success_RC, SUCCESS, result);
        } else {
          standardResponse(response, 200, error_RC, "Otp anda salah!");
        }
      });
  } catch (error) {
    console.log(error);
    standardResponse(response, 200, error_RC, "Otp anda salah!");
  }
};

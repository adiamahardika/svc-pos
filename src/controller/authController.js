import bcrypt from "bcrypt";
import crypto_js from "crypto-js";
import nodemailer from "nodemailer";
import SendOtp from "sendotp";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  emailCheckRepository,
  registerRepository,
  userCodeCheckRepository,
} from "../repository/authRepository.js";
import jwt from "jsonwebtoken";
import {
  email_smtp,
  host,
  jwt_secret_key,
  pass_smtp,
} from "../configs/index.js";
import { compress } from "../helpers/uploadFiles.js";
import { getDetailMerchantRepository } from "../repository/merchantRepository.js";
import {
  getDetailUserRepository,
  updateVerifyEmail,
} from "../repository/userRepository.js";

export const register = async (request, response) => {
  try {
    await compress(request.file.path);
    const date = new Date();
    const salt_rounds = 10;

    const hash = bcrypt.hashSync(request.body.password, salt_rounds);

    const request_data = {
      name: request.body.name,
      email: request.body.email,
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
      standardResponse(
        response,
        200,
        error_RC,
        "Email has already registered!"
      );
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

    if (user_check && user_check !== null) {
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
        standardResponse(response, 200, error_RC, "Your password is invalid!");
      }
    } else {
      standardResponse(
        response,
        200,
        error_RC,
        "Your email or user code is invalid!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const authentication = (request, response, next) => {
  const header_token = request.headers.token;
  if (!header_token) {
    standardResponse(response, 200, error_RC, "Please provide your token!");
  } else {
    jwt.verify(header_token, jwt_secret_key, (error, decoded) => {
      if (error && error.name === "TokenExpiredError") {
        standardResponse(response, 200, error_RC, "Your token has expired!");
      } else if (error && error.name === "JsonWebTokenError") {
        standardResponse(response, 200, error_RC, "Your token is invalid!");
      } else {
        next();
      }
    });
  }
};

export const authorization = async (request, response, next) => {
  const signature_key = request.headers.signature_key;
  const header_token = request.headers.token;
  if (!signature_key) {
    standardResponse(
      response,
      200,
      error_RC,
      "Please provide your signature_key!"
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
        "Your signature_key is invalid!"
      );
    } else {
      next();
    }
  }
};

export const refreshToken = async (request, response) => {
  try {
    const signature_key = request.headers.signature_key;
    const header_token = request.headers.token;

    if (!header_token || !signature_key) {
      standardResponse(
        response,
        200,
        error_RC,
        "Please provide your token and signature_key!"
      );
    } else {
      jwt.verify(header_token, jwt_secret_key, async (error, decoded) => {
        if (error && error.name === "JsonWebTokenError") {
          standardResponse(response, 200, error_RC, "Your token is invalid!");
        } else {
          const decode = jwt.decode(header_token);
          const merchant_id = await getDetailMerchantRepository(
            decode.merchant_id
          );
          const generate_signature_key = crypto_js
            .MD5(merchant_id.rows[0].id + merchant_id.rows[0].secret_key)
            .toString();

          if (signature_key !== generate_signature_key) {
            standardResponse(
              response,
              401,
              error_RC,
              "Your signature_key is invalid!"
            );
          } else {
            const token = jwt.sign(
              { merchant_id: merchant_id.id, signature_key: signature_key },
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
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const verifyEmail = async (request, response) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: email_smtp,
        pass: pass_smtp,
      },
    });

    const user_data = await getDetailUserRepository(request.body.user_id);
    const token = jwt.sign({ id: user_data.rows[0].id }, jwt_secret_key, {
      expiresIn: "1h",
    });
    const url = `${host}auth/confirm-email/${token}`;
    const mail_options = {
      from: `"Dev Trilogi" <${email_smtp}>`, // sender address
      to: request.body.email,
      subject: "Verify Email",
      html: `Please click this link to verify your email: <a href="${url}">${url}</a>`, // html body
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

    jwt.verify(token, jwt_secret_key, async (error, decoded) => {
      if (error && error.name === "TokenExpiredError") {
        standardResponse(response, 200, error_RC, "Your token has expired!");
      } else if (error && error.name === "JsonWebTokenError") {
        standardResponse(response, 200, error_RC, "Your token is invalid!");
      } else {
        const request_data = {
          is_email_validate: "true",
        };
        await updateVerifyEmail(request_data, decoded.id);
      }
    });
    standardResponse(response, 200, success_RC, SUCCESS);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const verifyPhoneNumber = async (request, response) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const sendOtp = new SendOtp(
      "AuthKey",
      `Otp for your order is {{otp}}, please do not share it with anybody`
    );
    console.log(request.body.no_hp);
    sendOtp.send(request.body.no_hp, "DEVTRLG", otp, (error, data) => {
      console.log(data);
    });
    standardResponse(response, 200, success_RC, SUCCESS);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

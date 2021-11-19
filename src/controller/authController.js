import bcrypt from "bcrypt";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  emailCheckRepository,
  registerRepository,
} from "../repository/authRepository.js";
import jwt from "jsonwebtoken";
import { host, jwt_secret_key } from "../configs/index.js";
import { getUserHasBranch } from "../repository/branchRepository.js";
import { compress } from "../helpers/uploadFiles.js";

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

    const email_check = await emailCheckRepository(request_data);
    if (email_check.rows.length > 0) {
      const match = await bcrypt.compare(
        request_data.password,
        email_check.rows[0].hash_password
      );
      if (match) {
        const user_data = email_check.rows[0];
        const token = jwt.sign(
          { email: user_data.email, password: user_data.hash_password },
          jwt_secret_key,
          {
            expiresIn: "16h",
          }
        );
        const branch = await getUserHasBranch(user_data.id);

        user_data.token = token;
        user_data.branch = branch.rows;

        delete user_data.is_active;
        delete user_data.hash_password;
        delete user_data.created_at;
        delete user_data.created_by;
        delete user_data.updated_at;
        delete user_data.updated_by;

        standardResponse(response, 200, success_RC, SUCCESS, email_check);
      } else {
        standardResponse(response, 200, error_RC, "Your password is invalid!");
      }
    } else {
      standardResponse(response, 200, error_RC, "Your email is invalid!");
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

import bcrypt from "bcrypt";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  emailCheckRepository,
  registerRepository,
  userCodeCheckRepository,
} from "../repository/authRepository.js";
import jwt from "jsonwebtoken";
import { host, jwt_secret_key } from "../configs/index.js";
import { compress } from "../helpers/uploadFiles.js";
import {
  getBranchByMerchantId,
  getDetailBranchRepository,
} from "../repository/branchRepository.js";

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
    let branch_list = null;
    const email_check = await emailCheckRepository(request_data);
    const user_code_check = await userCodeCheckRepository(request_data);

    if (email_check.rows.length > 0) {
      user_check = email_check;
      branch_list = await getBranchByMerchantId(
        email_check.rows[0].merchant_id
      );
    } else if (user_code_check.rows.length > 0) {
      user_check = user_code_check;
      branch_list = await getDetailBranchRepository(
        user_code_check.rows[0].branch_id
      );
    }

    if (user_check && user_check !== null) {
      const match = await bcrypt.compare(
        request_data.password,
        user_check.rows[0].hash_password
      );
      if (match) {
        let user_data = user_check.rows[0];
        const token = jwt.sign(
          { email: user_data.email, password: user_data.hash_password },
          jwt_secret_key,
          {
            expiresIn: "16h",
          }
        );

        user_data = {
          ...user_data,
          token: token,
          ktp: user_data.ktp ? host + "ktp/" + user_data.ktp : null,
          branch_list: branch_list.rows,
        };

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

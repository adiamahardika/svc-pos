import bcrypt from "bcrypt";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  emailCheckRepository,
  registerRepository,
  usernameCheckRepository,
} from "../repository/authRepository.js";
export const register = async (request, response) => {
  try {
    const date = new Date();
    const salt_rounds = 10;

    const hash = bcrypt.hashSync(request.body.password, salt_rounds);

    const request_data = {
      username: request.body.username,
      name: request.body.name,
      email: request.body.email,
      role_id: request.body.role_id,
      hash_password: hash,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };

    const email_check = await emailCheckRepository(request_data);
    const username_check = await usernameCheckRepository(request_data);

    if (email_check.rows.length === 0 && username_check.rows.length === 0) {
      const result = await registerRepository(request_data);
      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else if (username_check.rows.length > 0) {
      standardResponse(
        response,
        200,
        error_RC,
        "Username has already registered!"
      );
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

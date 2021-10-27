import { success_desc, success_RC } from "../helpers/generalConstant.js";
export const standardResponse = (
  response,
  http_status,
  response_code,
  description,
  data
) => {
  const result = {};

  result.https_status = http_status || 200;
  result.response_code = response_code || success_RC;
  result.description = description || success_desc;
  result.result = data.rows;

  return response.status(result.https_status).json(result);
};

import { SUCCESS, success_RC } from "../helpers/generalConstant.js";
export const standardResponse = (
  response,
  http_status,
  response_code,
  description,
  data,
  active_page,
  total_pages,
  total_data
) => {
  const result = {};

  result.https_status = http_status || 200;
  result.response_code = response_code || success_RC;
  result.description = description || SUCCESS;
  result.active_page = active_page || 0;
  result.total_pages = total_pages || 1;
  result.total_data = parseInt(total_data) || "-";
  result.result = data ? data.rows : [];

  return response.status(result.https_status).json(result);
};

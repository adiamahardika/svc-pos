import { createLogRepository } from "../repository/logRepository.js";

function check_length(n) {
  return n < 10 ? "0" + n : n;
}

export const createLog = async (request, response) => {
  try {
    const date = new Date();
    const user = request.get("request-from")
      ? request.get("request-from")
      : "-";
    const log_id =
      date.getFullYear().toString() +
      check_length(date.getMonth() + 1) +
      check_length(date.getDate()) +
      check_length(date.getHours()) +
      check_length(date.getMinutes()) +
      check_length(date.getSeconds()) +
      check_length(date.getMilliseconds());
    const start = Date.parse(response._startTime);

    const request_data = {
      log_id: log_id,
      request_from: user,
      request_to: request.originalUrl,
      request_data: JSON.stringify(request.body),
      response_data: JSON.stringify(response.body),
      request_time: response._startTime,
      response_time: date,
      total_time: date.getTime() - start,
      http_status_code: response.statusCode,
      log_date: date,
      log_by: user,
    };

    createLogRepository(request_data);
  } catch (error) {
    console.log(error);
  }
};

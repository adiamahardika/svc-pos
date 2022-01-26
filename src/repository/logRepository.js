import connection from "../configs/postgres.js";

export const createLogRepository = (request) => {
  const query = {
    text: `INSERT INTO lg_service_activities(log_id, request_from, request_to, request_data, response_data, request_time, response_time, total_time, http_status_code, log_date, log_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    values: [
      request.log_id,
      request.request_from,
      request.request_to,
      request.request_data,
      request.response_data,
      request.request_time,
      request.response_time,
      request.total_time,
      request.http_status_code,
      request.log_date,
      request.log_by,
    ],
  };
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
};

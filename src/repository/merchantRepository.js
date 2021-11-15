import connection from "../configs/postgres.js";

export const getDetailMerchantRepository = (merchant_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM merchant WHERE id = ${merchant_id}`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const countMerchant = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM merchant WHERE name LIKE '%${request.search}%'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result.rows[0].total_data);
        }
      }
    );
  });
};

export const getMerchantRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM merchant WHERE name LIKE '%${request.search}%' ORDER BY name LIMIT ${request.limit} OFFSET ${request.start_index}`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }
    );
  });
};

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

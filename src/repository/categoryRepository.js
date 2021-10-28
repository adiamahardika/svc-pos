import connection from "../configs/postgres.js";

export const getCategoryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT category.*, merchant.name as merchant FROM category LEFT OUTER JOIN merchant ON (category.merchant_id = CAST(merchant.id AS varchar(10))) WHERE category.merchant_id LIKE '%${request.merchant_id}%'`,
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

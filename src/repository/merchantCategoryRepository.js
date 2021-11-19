import connection from "../configs/postgres.js";

export const getMerhcantCategoryRespository = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM merchant_category ORDER BY name ASC`,
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

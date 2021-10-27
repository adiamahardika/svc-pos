import connection from "../configs/postgres.js";

export const getProductModel = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT product.*, category.name as category FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10)))`,
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

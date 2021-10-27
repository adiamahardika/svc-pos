import connection from "../configs/postgres.js";

export const getProductRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT product.*, category.name as category, stock.quantity FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) LEFT OUTER JOIN stock ON (CAST(product.id AS varchar(10)) = stock.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND stock.branch_id LIKE '%${request.branch_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%'`,
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

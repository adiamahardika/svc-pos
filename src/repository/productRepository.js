import connection from "../configs/postgres.js";

export const getProductRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT product.*, category.name as category FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%' ORDER BY ${request.order_by} LIMIT ${request.limit} OFFSET ${request.start_index}`,
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

export const createProductRepository = (request) => {
  const query = {
    text: `INSERT INTO product(name, merchant_id, category_id, image, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [
      request.name,
      request.merchant_id,
      request.category_id,
      request.image,
      request.updated_by,
      request.updated_at,
      request.created_by,
      request.created_at,
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

export const countProduct = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) LEFT OUTER JOIN stock ON (CAST(product.id AS varchar(10)) = stock.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND stock.branch_id LIKE '%${request.branch_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%'`,
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

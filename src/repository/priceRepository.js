import connection from "../configs/postgres.js";

export const createPriceRepository = (request) => {
  const query = {
    text: `INSERT INTO price(product_id, starting_price, selling_price, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [
      request.product_id,
      request.starting_price,
      request.selling_price,
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

export const updatePriceRepository = (request, id) => {
  const query = {
    text: `UPDATE price SET starting_price = $1, selling_price = $2, updated_by = $4, updated_at = $5 WHERE product_id = $6 RETURNING price.*`,
    values: [
      request.starting_price,
      request.selling_price,
      request.updated_by,
      request.updated_at,
      id,
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

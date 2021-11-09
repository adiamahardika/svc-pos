import connection from "../configs/postgres.js";

export const createPriceRepository = (request) => {
  const query = {
    text: `INSERT INTO price(product_id, starting_price, dine_in_price, take_away_price, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [
      request.product_id,
      request.starting_price,
      request.dine_in_price,
      request.take_away_price,
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

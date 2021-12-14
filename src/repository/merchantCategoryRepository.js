import connection from "../configs/postgres.js";

export const getMerhcantCategoryRespository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM merchant_category WHERE is_active = '${request.is_active}' ORDER BY name ASC`,
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

export const createMerchantCategoryRepository = (request) => {
  const query = {
    text: `INSERT INTO merchant_category(id, name, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [
      request.id,
      request.name,
      request.is_active,
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

export const updateMerchantCategoryRepository = (request, id) => {
  const query = {
    text: `UPDATE merchant_category SET name = $1, updated_by = $2, updated_at = $3 WHERE id = $4 RETURNING merchant_category.*`,
    values: [request.name, request.updated_by, request.updated_at, id],
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

export const deleteMerchantCategoryRepository = (request, id) => {
  const query = {
    text: `UPDATE merchant_category SET is_active = $1 WHERE id = $2`,
    values: [request.is_active, id],
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

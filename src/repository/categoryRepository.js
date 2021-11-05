import connection from "../configs/postgres.js";

export const getCategoryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT category.*, merchant.name as merchant FROM category LEFT OUTER JOIN merchant ON (category.merchant_id = CAST(merchant.id AS varchar(10))) WHERE category.merchant_id LIKE '%${request.merchant_id}%' AND category.is_active = '${request.is_active}' ORDER BY name`,
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

export const createCategoryRepository = (request) => {
  const query = {
    text: `INSERT INTO category(name, merchant_id, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [
      request.name,
      request.merchant_id,
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

export const updateCategoryRepository = (request, id) => {
  const query = {
    text: `UPDATE category SET name = $1, updated_by = $2, updated_at = $3 WHERE id = $4 RETURNING category.*`,
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

export const deleteCategoryRepository = (request, id) => {
  const query = {
    text: `UPDATE category SET is_active = $1 WHERE id = $2`,
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

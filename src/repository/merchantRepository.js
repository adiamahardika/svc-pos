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

export const countMerchant = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM merchant WHERE name LIKE '%${request.search}%'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result.rows[0].total_data);
        }
      }
    );
  });
};

export const getMerchantRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT merchant.*, users.name as owner_name FROM merchant LEFT OUTER JOIN users ON (merchant.owner = CAST(users.id AS varchar(10))) WHERE merchant.name LIKE '%${
        request.search
      }%' OR merchant.merchant_code LIKE '%${request.search.toUpperCase()}%' ORDER BY name LIMIT ${
        request.limit
      } OFFSET ${request.start_index}`,
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

export const createMerchantRepository = (request) => {
  const query = {
    text: `INSERT INTO merchant(name, owner,npwp, mc_id, ba_id, merchant_code, secret_key, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    values: [
      request.name,
      request.owner,
      request.npwp,
      request.mc_id,
      request.ba_id,
      request.merchant_code,
      request.secret_key,
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

export const checkMerchantCode = (merchant_code) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM merchant WHERE merchant_code LIKE '%${merchant_code}%'`,
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

export const updateMerchantRepository = async (request, id) => {
  const query = {
    text: `UPDATE merchant SET name = $1, is_active = $2, updated_by = $3, updated_at = $4 WHERE id = $5 RETURNING merchant.*`,
    values: [
      request.name,
      request.is_active,
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

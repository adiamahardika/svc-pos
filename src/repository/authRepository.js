import connection from "../configs/postgres.js";

export const registerRepository = (request) => {
  const query = {
    text: `INSERT INTO users(id, name, email, role_id, ktp, hash_password, is_active, no_hp, is_otp_validate, is_email_validate, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
    values: [
      request.id,
      request.name,
      request.email,
      request.role_id,
      request.ktp,
      request.hash_password,
      request.is_active,
      request.no_hp,
      request.is_otp_validate,
      request.is_email_validate,
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

export const emailCheckRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.*, merchant.id as merchant_id, merchant.name as merchant_name, merchant.secret_key, role.name as role_name, role.level as role_level FROM users LEFT OUTER JOIN merchant ON (merchant.owner = CAST(users.id AS varchar(10))) LEFT OUTER JOIN role ON (users.role_id = CAST(role.id AS varchar(10))) WHERE email LIKE '%${request.email}%'`,
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

export const userCodeCheckRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_branch.*, merchant.name AS merchant_name, merchant.secret_key, role.name as role_name, role.level as role_level FROM user_branch LEFT OUTER JOIN merchant ON (user_branch.merchant_id = CAST(merchant.id AS varchar(10))) LEFT OUTER JOIN role ON (user_branch.role_id = CAST(role.id AS varchar(10))) WHERE user_code LIKE '%${request.email}%'`,
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

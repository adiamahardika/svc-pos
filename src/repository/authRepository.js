import connection from "../configs/postgres.js";

export const registerRepository = (request) => {
  const query = {
    text: `INSERT INTO users(username, name, email, role_id, hash_password, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    values: [
      request.username,
      request.name,
      request.email,
      request.role_id,
      request.hash_password,
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

export const emailCheckRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.*, merchant.id as merchant_id, merchant.name as merchant_name, role.name as role_name FROM users LEFT OUTER JOIN merchant ON (merchant.owner = CAST(users.id AS varchar(10))) LEFT OUTER JOIN role ON (users.role_id = CAST(role.id AS varchar(10))) WHERE email LIKE '%${request.email}%'`,
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

export const usernameCheckRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.* FROM users WHERE username LIKE '%${request.username}%'`,
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

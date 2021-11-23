import connection from "../configs/postgres.js";

export const getUserRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM (SELECT users.*, role.name AS role_name, merchant.name as merchant_name FROM users LEFT OUTER JOIN role ON (users.role_id = CAST(role.id AS varchar(10))) LEFT OUTER JOIN merchant ON (merchant.owner = CAST(users.id AS varchar(10))) WHERE users.role_id LIKE '%${request.role_id}%' ORDER BY name ASC LIMIT ${request.limit} OFFSET ${request.start_index}) as tbl WHERE tbl.name LIKE '%${request.search}%' OR tbl.email LIKE '%${request.search}%'`,
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

export const countUser = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM (SELECT users.* FROM users WHERE users.role_id LIKE '%${request.role_id}%') as tbl WHERE tbl.name LIKE '%${request.search}%' OR tbl.email LIKE '%${request.search}%'`,
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

export const getDetailUserRepository = (user_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.*, role.name AS role_name, merchant.name as merchant_name FROM users LEFT OUTER JOIN role ON (users.role_id = CAST(role.id AS varchar(10))) LEFT OUTER JOIN merchant ON (merchant.owner = CAST(users.id AS varchar(10))) WHERE users.id = ${user_id}`,
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

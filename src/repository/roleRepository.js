import connection from "../configs/postgres.js";

export const getRoleRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT role.* FROM role WHERE name LIKE '%${request.search}%' AND is_active LIKE  '%${request.is_active}%' ORDER BY name ASC`,
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

export const createRoleRepository = (request) => {
  const query = {
    text: `INSERT INTO role(name, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    values: [
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

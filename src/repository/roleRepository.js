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
    text: `INSERT INTO role(name, level, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [
      request.name,
      request.level,
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

export const updateRoleRepository = (request, id) => {
  const query = {
    text: `UPDATE role SET name = $1, updated_by = $2, updated_at = $3 WHERE id = $4 RETURNING role.*`,
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

export const deleteRoleRepository = (request, id) => {
  const query = {
    text: `UPDATE role SET is_active = $1 WHERE id = $2`,
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

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

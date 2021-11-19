import connection from "../configs/postgres.js";

export const createUserBranchRepository = (request) => {
  const query = {
    text: `INSERT INTO user_branch(user_code, hash_password, is_active, branch_id, merchant_id, role_id, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    values: [
      request.user_code,
      request.hash_password,
      request.is_active,
      request.branch_id,
      request.merchant_id,
      request.role_id,
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

export const countUserBranchByBranch = (branch_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM user_branch WHERE branch_id LIKE '%${branch_id}%'`,
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

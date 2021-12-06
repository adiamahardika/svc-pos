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
      `SELECT count(*) as total_data FROM user_branch WHERE branch_id = '${branch_id}'`,
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

export const getUserBranchRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM (SELECT user_branch.*, branch.location as branch_location, role.name as role_name, merchant.name as merchant_name FROM user_branch LEFT OUTER JOIN branch ON (user_branch.branch_id = CAST(branch.id AS varchar(10))) LEFT OUTER JOIN role ON (user_branch.role_id = CAST(role.id AS varchar(10))) LEFT OUTER JOIN merchant ON (user_branch.merchant_id = CAST(merchant.id AS varchar(10))) WHERE user_branch.merchant_id LIKE '%${request.merchant_id}%' AND user_branch.branch_id LIKE '%${request.branch_id}%' AND user_branch.role_id LIKE '%${request.role_id}%' AND user_branch.is_active LIKE '%${request.is_active}%' ORDER BY user_branch.user_code ASC) AS tbl WHERE tbl.user_code LIKE '%${request.search}%'`,
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

export const updateUserBranchRepository = (request, id) => {
  const query = {
    text: `UPDATE user_branch SET role_id = $1, is_active = $2, updated_by = $3, updated_at = $4 WHERE id = $5 RETURNING user_branch.*`,
    values: [
      request.role_id,
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

export const deleteUserBranchRepository = (request, id) => {
  const query = {
    text: `UPDATE user_branch SET is_active = $1 WHERE id = $2`,
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

export const getDetailUserBranchRepository = (user_code) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_branch.*, branch.location as branch_location, role.name as role_name, merchant.name as merchant_name FROM user_branch LEFT OUTER JOIN branch ON (user_branch.branch_id = CAST(branch.id AS varchar(10))) LEFT OUTER JOIN role ON (user_branch.role_id = CAST(role.id AS varchar(10))) LEFT OUTER JOIN merchant ON (user_branch.merchant_id = CAST(merchant.id AS varchar(10))) WHERE user_branch.user_code LIKE '%${user_code}%'`,
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

export const changePasswordUserBranchRepository = (request, user_code) => {
  const query = {
    text: `UPDATE user_branch SET hash_password = $1, updated_by = $2, updated_at = $3 WHERE user_code = $4 RETURNING user_branch.*`,
    values: [
      request.hash_password,
      request.updated_by,
      request.updated_at,
      user_code,
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

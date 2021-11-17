import connection from "../configs/postgres.js";

export const getUserHasBranch = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT branch.*, merchant.name as merchant_name FROM branch LEFT OUTER JOIN merchant ON (branch.merchant_id = CAST(merchant.id AS varchar(10))) WHERE CAST(branch.id AS varchar(10)) IN (SELECT user_has_branch.branch_id FROM user_has_branch WHERE user_id = '${id}')`,
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

export const getMaxBranchNumberByMerchant = (merchant_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT MAX(branch_number) FROM branch WHERE merchant_id = '${merchant_id}'`,
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

export const getDetailBranch = (branch_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM branch WHERE id = ${branch_id}`,
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

export const getBranchByMerchantId = (merchant_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT branch.* FROM branch WHERE merchant_id LIKE '%${merchant_id}%'`,
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

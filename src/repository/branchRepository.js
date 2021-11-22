import connection from "../configs/postgres.js";

export const getMaxBranchNumberByMerchant = (merchant_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT MAX(branch_number) as max FROM branch WHERE merchant_id = '${merchant_id}'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result.rows[0].max);
        }
      }
    );
  });
};

export const getDetailBranchRepository = (branch_id) => {
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

export const createBranchRepository = (request) => {
  const query = {
    text: `INSERT INTO branch(location, merchant_id, branch_address, branch_number, provinsi, kota, kecamatan, kelurahan, kode_pos, email, phone, fax, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
    values: [
      request.location,
      request.merchant_id,
      request.branch_address,
      request.branch_number,
      request.provinsi,
      request.kota,
      request.kecamatan,
      request.kelurahan,
      request.kode_pos,
      request.email,
      request.phone,
      request.fax,
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

export const updateBranchRepository = (request, branch_id) => {
  const query = {
    text: `UPDATE branch SET location = $1, branch_address = $2, provinsi = $3, kota = $4, kecamatan = $5, kelurahan = $6, kode_pos = $7, email = $8, phone = $9, fax = $10, updated_by = $11, updated_at = $12 WHERE id = $13 RETURNING branch.*`,
    values: [
      request.location,
      request.branch_address,
      request.provinsi,
      request.kota,
      request.kecamatan,
      request.kelurahan,
      request.kode_pos,
      request.email,
      request.phone,
      request.fax,
      request.updated_by,
      request.updated_at,
      branch_id,
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

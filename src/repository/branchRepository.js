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
      `SELECT * FROM branch WHERE id = '${branch_id}'`,
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
      `SELECT branch.* FROM branch WHERE merchant_id = '${merchant_id}' ORDER BY location ASC`,
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
    text: `INSERT INTO branch(id, location, merchant_id, branch_address, branch_number, provinsi, kota, kecamatan, kelurahan, kode_pos, email, phone, telephone, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
    values: [
      request.id,
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
      request.telephone,
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
    text: `UPDATE branch SET location = $1, branch_address = $2, provinsi = $3, kota = $4, kecamatan = $5, kelurahan = $6, kode_pos = $7, email = $8, phone = $9, telephone = $10, updated_by = $11, updated_at = $12 WHERE id = $13 RETURNING branch.*`,
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
      request.telephone,
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

export const countBranch = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM (SELECT * FROM branch WHERE merchant_id LIKE '%${request.merchant_id}%' AND branch.is_active LIKE '%${request.is_active}%') AS tbl WHERE tbl.location LIKE '%${request.search}%' OR tbl.branch_address LIKE '%${request.search}%'`,
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

export const getBranchRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM (SELECT merchant.name AS merchant_name, branch.* FROM branch LEFT OUTER JOIN merchant ON (branch.merchant_id = CAST(merchant.id AS varchar(10))) WHERE branch.merchant_id LIKE '%${request.merchant_id}%' AND branch.is_active LIKE '%${request.is_active}%' ORDER BY ${request.order_by} ${request.sort_by} LIMIT ${request.limit} OFFSET ${request.start_index}) AS tbl WHERE tbl.location LIKE '%${request.search}%' OR tbl.branch_address LIKE '%${request.search}%'`,
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

export const deleteBranchRepository = (request, branch_id) => {
  const query = {
    text: `UPDATE branch SET is_active = $1 WHERE id = $2`,
    values: [request.is_active, branch_id],
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

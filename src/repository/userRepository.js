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

export const updateVerifyEmail = (request, id) => {
  const query = {
    text: `UPDATE users SET is_email_validate = $1 WHERE id = $2`,
    values: [request.is_email_validate, id],
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

export const changePasswordUserRepository = (request, email) => {
  const query = {
    text: `UPDATE users SET hash_password = $1, updated_by = $2, updated_at = $3 WHERE email = $4 RETURNING users.*`,
    values: [
      request.hash_password,
      request.updated_by,
      request.updated_at,
      email,
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

export const updateVerifyOtp = (request, id) => {
  const query = {
    text: `UPDATE users SET is_otp_validate = $1 WHERE id = $2`,
    values: [request.is_otp_validate, id],
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

export const updateUserRepository = (request, id) => {
  let query = null;
  if (request.image) {
    query = {
      text: `UPDATE users SET name = $1, email = $2, no_hp = $3, updated_by = $4, updated_at = $5, ktp = $6 WHERE id = $7 RETURNING users.*`,
      values: [
        request.name,
        request.email,
        request.no_hp,
        request.updated_by,
        request.updated_at,
        request.ktp,
        id,
      ],
    };
  } else {
    query = {
      text: `UPDATE users SET name = $1, email = $2, no_hp = $3, updated_by = $4, updated_at = $5 WHERE id = $6 RETURNING users.*`,
      values: [
        request.name,
        request.email,
        request.no_hp,
        request.updated_by,
        request.updated_at,
        id,
      ],
    };
  }
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

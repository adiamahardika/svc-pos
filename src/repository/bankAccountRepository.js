import connection from "../configs/postgres.js";

export const createBankAccountRepository = (request) => {
  const query = {
    text: `INSERT INTO bank_account(bank_name, nasabah, no_rekening, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [
      request.bank_name,
      request.nasabah,
      request.no_rekening,
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

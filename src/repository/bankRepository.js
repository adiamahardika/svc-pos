import connection from "../configs/postgres.js";

export const getBankRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT banks.id, banks.bank_name AS name, banks.code FROM banks WHERE bank_name LIKE '%${request.search}%' ORDER BY bank_name`,
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

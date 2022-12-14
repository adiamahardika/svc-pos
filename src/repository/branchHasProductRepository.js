import connection from "../configs/postgres.js";

export const getBranchProductRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT branch_has_product.*, CAST(branch_has_product.branch_price AS INTEGER), product.name, product.image, product.merchant_id, product.category_id, category.name as category, merchant.name as merchant_name, branch.id as branch_id, branch.location as branch_location, CAST(price.starting_price AS INTEGER), CAST(price.selling_price AS INTEGER) FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) LEFT OUTER JOIN merchant ON (product.merchant_id = CAST(merchant.id AS varchar(10))) LEFT OUTER JOIN branch_has_product ON (product.id = branch_has_product.product_id) LEFT OUTER JOIN branch ON (branch.id = branch_has_product.branch_id) LEFT OUTER JOIN price ON (CAST(product.id AS varchar(10)) = price.product_id) AND price.created_at = (SELECT MAX(created_at) FROM price WHERE CAST(product.id AS varchar(10)) = price.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND branch_has_product.branch_id LIKE '%${request.branch_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%' AND product.is_active = '${request.is_active}' ORDER BY ${request.sort_by} ${request.order_by} LIMIT ${request.limit} OFFSET ${request.start_index} `,
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

export const countBranchProduct = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM product LEFT OUTER JOIN branch_has_product ON (product.id = branch_has_product.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND branch_has_product.branch_id LIKE '%${request.branch_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%' AND product.is_active = '${request.is_active}'`,
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

export const createBranchProductRepository = (request) => {
  const query = {
    text: `INSERT INTO branch_has_product(product_id, branch_id, quantity, branch_price, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [
      request.product_id,
      request.branch_id,
      request.quantity,
      request.branch_price,
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

export const updateBranchProductRepository = (request, id) => {
  const query = {
    text: `UPDATE branch_has_product SET quantity = $1, branch_price = $2, updated_by = $3, updated_at = $4 WHERE id = $5 RETURNING branch_has_product.*`,
    values: [
      request.quantity,
      request.branch_price,
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

export const deleteBranchProductRepository = (id) => {
  const query = {
    text: `DELETE FROM branch_has_product WHERE id = $1`,
    values: [id],
  };
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) reject(new Error(error), console.log(error));
      resolve(result);
    });
  });
};

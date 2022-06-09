import connection from "../configs/postgres.js";

export const getProductRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT product.*, category.name as category, merchant.name as merchant_name, CAST(price.starting_price AS INTEGER), CAST(price.selling_price AS INTEGER) FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) LEFT OUTER JOIN merchant ON (product.merchant_id = CAST(merchant.id AS varchar(10))) LEFT OUTER JOIN price ON (CAST(product.id AS varchar(10)) = price.product_id) AND price.created_at = (SELECT MAX(created_at) FROM price WHERE CAST(product.id AS varchar(10)) = price.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%' AND product.is_active = '${request.is_active}' ORDER BY ${request.sort_by} ${request.order_by} LIMIT ${request.limit} OFFSET ${request.start_index} `,
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

export const createProductRepository = (request) => {
  const query = {
    text: `INSERT INTO product(id, name, merchant_id, category_id, image, is_active, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    values: [
      request.id,
      request.name,
      request.merchant_id,
      request.category_id,
      request.image,
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

export const countProduct = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM product LEFT OUTER JOIN branch_has_product ON (product.id = branch_has_product.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%' AND product.is_active = '${request.is_active}'`,
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

export const updateProductRepository = (request, id) => {
  let query = null;
  if (request.image) {
    query = {
      text: `UPDATE product SET name = $1, category_id = $2, image = $3, updated_by = $4, updated_at = $5 WHERE id = $6 RETURNING product.*`,
      values: [
        request.name,
        request.category_id,
        request.image,
        request.updated_by,
        request.updated_at,
        id,
      ],
    };
  } else {
    query = {
      text: `UPDATE product SET name = $1, category_id = $2, updated_by = $3, updated_at = $4 WHERE id = $5 RETURNING product.*`,
      values: [
        request.name,
        request.category_id,
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

export const deleteProductRepository = (request, id) => {
  const query = {
    text: `UPDATE product SET is_active = $1 WHERE id = $2 RETURNING product.*`,
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

export const getBranchProductRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT product.*, category.name as category, merchant.name as merchant_name, branch.location as branch_location, branch_has_product.quantity, CAST(branch_has_product.branch_price AS INTEGER), CAST(price.starting_price AS INTEGER), CAST(price.selling_price AS INTEGER) FROM product LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) LEFT OUTER JOIN merchant ON (product.merchant_id = CAST(merchant.id AS varchar(10))) LEFT OUTER JOIN branch_has_product ON (product.id = branch_has_product.product_id) LEFT OUTER JOIN branch ON (branch.id = branch_has_product.branch_id) LEFT OUTER JOIN price ON (CAST(product.id AS varchar(10)) = price.product_id) AND price.created_at = (SELECT MAX(created_at) FROM price WHERE CAST(product.id AS varchar(10)) = price.product_id) WHERE product.merchant_id LIKE '%${request.merchant_id}%' AND branch_has_product.branch_id LIKE '%${request.branch_id}%' AND product.name LIKE '%${request.search}%' AND product.category_id LIKE '%${request.category_id}%' AND product.is_active = '${request.is_active}' ORDER BY ${request.sort_by} ${request.order_by} LIMIT ${request.limit} OFFSET ${request.start_index} `,
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

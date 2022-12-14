import connection from "../configs/postgres.js";

export const getProvinceRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM provinces ORDER BY prov_name`,
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

export const getCityRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT cities.*, provinces.prov_name FROM cities LEFT OUTER JOIN provinces ON cities.prov_id = provinces.prov_id WHERE cities.prov_id = ${request.prov_id} OR provinces.prov_name = '${request.prov_name}' ORDER BY city_name`,
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

export const getDistrictRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT districts.*, cities.city_name FROM districts LEFT OUTER JOIN cities ON cities.city_id = districts.city_id WHERE districts.city_id = ${request.city_id} OR cities.city_name = '${request.city_name}' ORDER BY dis_name`,
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

export const getSubdistrictRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT subdistricts.*, postalcode.postal_code, districts.dis_name FROM subdistricts LEFT OUTER JOIN postalcode ON (subdistricts.subdis_id = postalcode.subdis_id) LEFT OUTER JOIN districts ON districts.dis_id = subdistricts.dis_id WHERE subdistricts.dis_id = ${request.dis_id} OR districts.dis_name = '${request.dis_name}' ORDER BY subdis_name`,
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

export const selectSubdistrictRepository = (request) => {
  const query = {
    text: `SELECT * FROM (SELECT subdistricts.*, districts.dis_name, cities.city_name, provinces.prov_name FROM subdistricts LEFT OUTER JOIN districts ON (subdistricts.dis_id = districts.dis_id) LEFT OUTER JOIN cities ON (districts.city_id = cities.city_id) LEFT OUTER JOIN provinces ON (cities.prov_id = provinces.prov_id)) AS tbl WHERE tbl.subdis_name = $1 AND tbl.dis_name = $2 AND tbl.city_name = $3 AND tbl.prov_name = $4`,
    values: [
      request.subdis_name,
      request.dis_name,
      request.city_name,
      request.prov_name,
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

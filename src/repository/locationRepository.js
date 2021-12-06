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

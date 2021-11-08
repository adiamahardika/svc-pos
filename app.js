import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import connection from "./src/configs/postgres.js";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import { port } from "./src/configs/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { allRouter } from "./src/router/router.js";
import { database } from "./src/configs/index.js";

const app = express();
const { json, urlencoded } = bodyParser;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);
connection.connect();
connection.query("SELECT NOW()", (error, res) => {
  if (error) {
    console.log("Connection to Database has been failed!");
  } else {
    connection.query(`SET search_path TO ${database.schema};`);
    console.log("Connection to database has been success!");
  }
});

app.use(json());

app.use(cors("*"));

app.use(logger("dev"));

app.use(json());
app.use(urlencoded({ extended: true }));
sslServer.listen(port, () => {
  console.log(`This Secure Server is Running on port ${port}`);
});

app.use("/", allRouter);

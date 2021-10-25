import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import connection from "./src/configs/postgres.js";
import cors from "cors";
import { port } from "./src/configs/index.js";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
connection.query("SELECT NOW()", (error, res) => {
  if (error) {
    console.log("Connection to Database has been failed!");
  } else {
    console.log("Connection to database has been success!");
  }
});

app.use(json());

app.use(cors("*"));

app.use(logger("dev"));

app.use(json());
app.use(urlencoded({ extended: true }));

sslServer.listen(port, () =>
  console.log(`This Secure Server is Running on port ${port}`)
);

app.use("/", (req, res, next) => {
  res.send("Hello from SSL server");
});

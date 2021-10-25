import express from "express";
const app = express();
import logger from "morgan";
import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;
import connection from "./src/configs/postgres.js";
import cors from "cors";
import { port } from "./src/configs/index.js";

connection.query("SELECT NOW()", (error, res) => {
  if (error) {
    console.log("Connection to Database has been failed!");
  } else {
    console.log("Connection to database has been success!");
  }
});

app.use(json());
app.listen(port, () => console.log(`This Server is Running on port ${port}`));

app.use(cors("*"));

app.use(logger("dev"));

app.use(json());
app.use(urlencoded({ extended: true }));

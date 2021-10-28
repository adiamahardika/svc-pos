import { database } from "./index.js";
import pg from "pg";
const { Client } = pg;

const connectionString = `postgresql://${database.user}:${database.password}@${database.host}:${database.port}/${database.database}`;
const connection = new Client({
  connectionString,
});

export default connection;

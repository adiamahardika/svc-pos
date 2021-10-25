import { database } from "./index.js";
import pg from "pg";
const { Pool } = pg;

const connection = new Pool(database);

export default connection;

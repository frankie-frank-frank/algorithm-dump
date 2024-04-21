import mysql, { Pool } from "mysql2";
import * as dotenv from 'dotenv';
import { createBotTable } from "./db";

dotenv.config();

export function connectToDatabase(): Pool {
  const db_pool: Pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    connectionLimit: 1
  });
  return db_pool;
}

export function delay(milliseconds: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, milliseconds);
    });
}
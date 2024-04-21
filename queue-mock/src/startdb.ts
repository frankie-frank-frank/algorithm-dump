import { Pool } from "mysql2";
import { createBotTable } from "./db";
import {connectToDatabase} from "./lib";

export async function startAll(db: Pool) {
    await createBotTable(db)
}

let db = connectToDatabase();
startAll(db)
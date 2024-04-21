import { Pool } from "mysql2";
import { dropBotTable } from "./db";
import {connectToDatabase} from "./lib";

export async function stopAll(db: Pool) {
    await dropBotTable(db)
}

let db = connectToDatabase();
stopAll(db)
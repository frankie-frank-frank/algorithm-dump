import amqplib from "amqplib";
import * as dotenv from "dotenv";
import { delay, connectToDatabase } from "./lib";
import { fetchInsertBotTable, fetchTwentyBotTable } from "./db";
import { batchInsert, queueGen } from "./helpers";

dotenv.config();

async function Producer() {

    while (true) {
        try {
            let batchFetch: number[] = [];
            for(let i = 0; i < 20; i++) { batchFetch.push(Math.floor(Math.random() * 1000))}
            if(batchFetch.length > 0) {
                let batchInsertRes = await batchInsert(batchFetch);
                if(batchInsertRes === false) {
                    if(batchInsertRes === false) await delay(30 * 60 * 1000);
                    console.log("Restarting the producer after 30 minutes pause due to queue saturation");
                }
            }
        } catch (error) {
                console.log("An error occurred with producer: ", error);
        } finally {
            console.log("Finally end all connection");
        }
    }
}

Producer();

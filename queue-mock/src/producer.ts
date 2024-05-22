import amqplib from "amqplib";
import * as dotenv from "dotenv";
import { delay, connectToDatabase } from "./lib";
import { fetchInsertBotTable, fetchTwentyBotTable } from "./db";
import { batchInsert, queueGen } from "./helpers";

dotenv.config();

const QUEUE_NAME = process.env.MQ_QUEUE!;

async function Producer() {
    let channel = await queueGen()
    channel.assertQueue(QUEUE_NAME, { durable: false });
    let db = connectToDatabase();
    await fetchInsertBotTable(db); 

    while (true) {
        try {
            const batchFetch = async (): Promise<any> => { return (await fetchTwentyBotTable(db))}
            const fetchTwentyBotTableRes = await batchFetch();
            if(fetchTwentyBotTableRes.length > 0) {
                let batchInsertRes = await batchInsert(fetchTwentyBotTableRes, channel, db);
                if(batchInsertRes === true) {
                    batchInsertRes = await batchInsert(await batchFetch(), channel, db)
                } else {
                    if(batchInsertRes === false) await delay(30 * 60 * 1000);
                    db.end((error: any) => {
                        if(error) console.error('Error terminating the connection pool:', error)
                        else { console.log('Connection pool terminated successfully.')}
                    })
                    await channel.close()
                    console.log("Restarting the producer after 30 minutes pause due to queue saturation");
                    channel = await queueGen();
                    db = connectToDatabase()
                }
            }
        } catch (error) {
                console.log("An error occurred with producer: ", error);
        } finally {
            db.end((error: any) => {
                if(error) console.error('Error terminating the connection pool:', error)
                else { console.log('Connection pool terminated successfully.')}
            });
            await channel.close();
            console.log("Finally end all connection");
        }
    }
}

Producer();

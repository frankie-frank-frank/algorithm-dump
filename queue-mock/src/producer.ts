import amqplib from "amqplib";
import * as dotenv from "dotenv";
import { delay, connectToDatabase } from "./lib";
import { acknowledgeIdsite, fetchInsertBotTable, fetchTwentyBotTable } from "./db";
import { Pool } from "mysql2";

dotenv.config();

const RABBITMQ_HOST = process.env.MQ_HOST!;
const RABBITMQ_USERNAME = process.env.MQ_USER!;
const RABBITMQ_PASSWORD = process.env.MQ_PASS!;
const QUEUE_NAME = process.env.MQ_QUEUE!;
const RABBITMQ_PORT = process.env.MQ_PORT!;

// Create the RabbitMQ URL with credentials
const AMQP_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

async function batchInsert(fetchTenRecentIdSitesInput: number[], channel: amqplib.Channel, db: Pool): Promise<boolean|"error"> {
    try {
        const assertQueue = await channel.checkQueue(QUEUE_NAME);
        const queueLength = assertQueue.messageCount;
        console.log('Items in queue: ', queueLength);
        if (queueLength < 80) { // expect an operational capacity of 100 idsites as if it hits below 80 and we insert 20, we can expect a ceiling of 100 in queue
            for(const idsitehsr of fetchTenRecentIdSitesInput) {
                try {
                    await acknowledgeIdsite(db, idsitehsr);
                    channel.sendToQueue(
                        QUEUE_NAME,
                        Buffer.from(JSON.stringify({ idsitehsr }))
                    );
                } catch(e: any) {
                    console.error('Failed to queue idsite: ', e);
                }
            }
            return true
        } else {
            return false
        }
    }  catch (e: any) {
        return 'error'
    }
}

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

const queueGen = async (): Promise<amqplib.Channel> => {
    const amqConnect = await amqplib.connect(AMQP_URL);
    return await amqConnect.createChannel(); 
}

Producer();

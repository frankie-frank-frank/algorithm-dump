import { Pool } from "mysql2/typings/mysql/lib/Pool";
import amqplib from "amqplib";
import * as dotenv from "dotenv";
import { acknowledgeIdsite } from "./db";

dotenv.config();

const QUEUE_NAME = process.env.MQ_QUEUE!;
const RABBITMQ_HOST = process.env.MQ_HOST!;
const RABBITMQ_USERNAME = process.env.MQ_USER!;
const RABBITMQ_PASSWORD = process.env.MQ_PASS!;
const RABBITMQ_PORT = process.env.MQ_PORT!;

const AMQP_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

export async function batchInsert(fetchTenRecentIdSitesInput: number[]): Promise<boolean|"error"> {
    let channel = await queueGen()
    channel.assertQueue(QUEUE_NAME, { durable: true });    

    try {
        const assertQueue = await channel.checkQueue(QUEUE_NAME);
        const queueLength = assertQueue.messageCount;
        console.log('Items in queue: ', queueLength);
        if (queueLength < 80) { // expect an operational capacity of 100 idsites as if it hits below 80 and we insert 20, we can expect a ceiling of 100 in queue
            for(const idsitehsr of fetchTenRecentIdSitesInput) {
                try {
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
    } finally {
        await channel.close()
    }

}

export const queueGen = async (): Promise<amqplib.Channel> => {
    const amqConnect = await amqplib.connect(AMQP_URL);
    return await amqConnect.createChannel(); 
}

import * as dotenv from "dotenv";
import amqplib from "amqplib";
import { connectToDatabase, delay } from "./lib";
import { Pool } from "mysql2";
import { markSiteHsrAsProcessed } from "./db";

dotenv.config();

const RABBITMQ_HOST = process.env.MQ_HOST ?? "localhost";
const RABBITMQ_USERNAME = process.env.MQ_USER ?? "";
const RABBITMQ_PASSWORD = process.env.MQ_PASS ?? "";
const QUEUE_NAME = process.env.MQ_QUEUE ?? "hsr-bot-queue";
const RABBITMQ_PORT = process.env.MQ_PORT ?? 5672;

const AMQP_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

export default async function consumeMessages() {
  try {
    const connection = await amqplib.connect(AMQP_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.prefetch(1);
    console.log(`Connected to RabbitMQ`);
    console.log(`Consuming messages from the queue: ${QUEUE_NAME}`);

    // const db: Pool = connectToDatabase();
    channel.consume(QUEUE_NAME, async (msg) => {
      console.log('message: ', msg)
      if (msg !== null) {
        channel.ack(msg);
        const messageContent = msg.content.toString();
        console.log(`Received message: ${messageContent}`);
        const { idsitehsr } = (JSON.parse(messageContent)) as any;
        await delay(60 * 1000)
        // await markSiteHsrAsProcessed(db, idsitehsr)
      } else if (msg === null) {
        console.log("no message published");
      }
    });
} catch (error) {
  console.error(error);
  }
}

consumeMessages()
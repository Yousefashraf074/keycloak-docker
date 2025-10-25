// order-service/app.js
const express = require('express');
const amqp = require('amqplib');
const { Kafka } = require('kafkajs');
const bodyParser = require('body-parser');

const RABBIT = 'amqp://guest:guest@localhost:5672';
const KAFKA_BROKER = 'localhost:9092';

const app = express();
app.use(bodyParser.json());

let channel, kafkaProducer;

async function init() {
  const conn = await amqp.connect(RABBIT);
  channel = await conn.createChannel();
  await channel.assertQueue('orders', { durable: true });

  const kafka = new Kafka({ brokers: [KAFKA_BROKER] });
  kafkaProducer = kafka.producer();
  await kafkaProducer.connect();
  console.log("✅ Connected to RabbitMQ and Kafka");
}
init().catch(console.error);

app.post('/orders', async (req, res) => {
  const order = req.body; // { id, items, userId, total }
  console.log("📝 Received order:", order);

  // Send to RabbitMQ
  channel.sendToQueue('orders', Buffer.from(JSON.stringify(order)), { persistent: true });

  // Publish to Kafka
  await kafkaProducer.send({
    topic: 'order.created',
    messages: [{ key: String(order.id), value: JSON.stringify(order) }],
  });

  res.json({ status: 'queued', order });
});

app.listen(4000, () => console.log('🚀 Order Service running on port 4000'));

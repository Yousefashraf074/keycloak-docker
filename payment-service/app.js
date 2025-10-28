// payment-service/app.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['127.0.0.1:9092']  // or 'localhost:9092'
});



const consumer = kafka.consumer({ groupId: 'payment-group' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();

  // Subscribe to topic
  await consumer.subscribe({ topic: 'order.created', fromBeginning: true });

  // Listen for messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message from ${topic}: ${message.value.toString()}`);

      // Simulate a payment being processed
      const paymentResult = { orderId: message.value.toString(), status: 'paid' };

      // Produce result to Kafka
      await producer.send({
        topic: 'payment.processed',
        messages: [{ value: JSON.stringify(paymentResult) }],
      });

      console.log('Payment processed:', paymentResult);
    },
  });
}

run().catch(console.error);

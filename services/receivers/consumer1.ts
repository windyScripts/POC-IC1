// engages with messages, 0: No engagement 1: read 2: star

import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost'; // Replace with your RabbitMQ server URL
const EXCHANGE_NAME = 'exchange1';
const TOPICS = ['receiver1', 'common'];
const QUEUE_NAME = ''; // Let RabbitMQ generate a queue name

async function startReceiver() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    console.log('Connected to RabbitMQ');

    const channel = await connection.createChannel();
    console.log('Channel created');

    // Assert exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
    console.log(`Exchange '${EXCHANGE_NAME}' asserted`);

    // Assert a queue
    const { queue } = await channel.assertQueue(QUEUE_NAME, { exclusive: true });
    console.log(`Queue '${queue}' created and bound to exchange '${EXCHANGE_NAME}'`);

    // Bind the queue to the exchange with specified topics
    for (const topic of TOPICS) {
      await channel.bindQueue(queue, EXCHANGE_NAME, topic);
      console.log(`Queue '${queue}' bound to topic '${topic}'`);
    }

    console.log(`Waiting for messages on topics: ${TOPICS.join(', ')}`);

    // Consume messages
    channel.consume(queue, (msg) => {
      if (msg) {
        console.log(`Received message on topic '${msg.fields.routingKey}':`, msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

startReceiver();

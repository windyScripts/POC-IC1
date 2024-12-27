// sends messages of type INFO HUMOR NEWS GREET

// Import necessary modules
import amqp from 'amqplib';

// RabbitMQ connection details
const RABBITMQ_URL = 'amqp://localhost'; // Replace with your RabbitMQ server URL
const EXCHANGE_NAME = 'topic_logs'; // Name of the topic exchange

// Function to connect to RabbitMQ and send messages
async function startPublisher() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Assert a topic exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });

    console.log(`Connected to RabbitMQ at ${RABBITMQ_URL}`);
    console.log(`Using exchange: ${EXCHANGE_NAME}`);

    // Send messages every second
    setInterval(() => {
      const routingKey = getRandomRoutingKey();
      const message = `Message with routing key '${routingKey}' at ${new Date().toISOString()}`;

      // Publish the message to the exchange with the routing key
      channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(message));

      console.log(`[x] Sent '${message}'`);
    }, 1000);
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// Helper function to generate random routing keys
function getRandomRoutingKey(): string {
  const topics = ['quick.orange.rabbit', 'lazy.brown.fox', 'quick.brown.fox'];
  return topics[Math.floor(Math.random() * topics.length)];
}

// Start the publisher
startPublisher();

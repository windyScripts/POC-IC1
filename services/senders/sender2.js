"use strict";
// sends messages of type INFO HUMOR NEWS GREET
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// sends messages of type INFO ~~HUMOR NEWS GREET~~
// topic based
// Import necessary modules
const amqplib_1 = __importDefault(require("amqplib"));
// RabbitMQ connection details
const RABBITMQ_URL = 'amqp://localhost'; // Replace with your RabbitMQ server URL
const EXCHANGE_NAME = 'topic_logs'; // Name of the topic exchange
// Function to connect to RabbitMQ and send messages
function startPublisher() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to RabbitMQ server
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            const channel = yield connection.createChannel();
            // Assert a topic exchange
            yield channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
            console.log(`Connected to RabbitMQ at ${RABBITMQ_URL}`);
            console.log(`Using exchange: ${EXCHANGE_NAME}`);
            // Send messages every second
            setInterval(() => {
                const routingKey = getRandomRoutingKey();
                const message = getTopic() + " " + "sender2 " + new Date().toISOString(); //`Message with routing key '${routingKey}' at ${new Date().toISOString()}`;
                // Publish the message to the exchange with the routing key
                channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(message));
                console.log(`[x] Sent '${message}'`);
            }, 4000);
        }
        catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
        }
    });
}
function getTopic() {
    const topics = ['info'];
    return topics[Math.floor(Math.random() * topics.length)];
}
// Helper function to generate random routing keys
function getRandomRoutingKey() {
    const topics = ['news', 'info'];
    return topics[Math.floor(Math.random() * topics.length)];
}
// Start the publisher
startPublisher();

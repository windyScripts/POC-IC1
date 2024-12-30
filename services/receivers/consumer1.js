"use strict";
// engages with messages, 0: No engagement 1: read 2: star
// Creates network requests to server, sending post requests with data.
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
const amqplib_1 = __importDefault(require("amqplib"));
const domain1 = "http://localhost:3000"; //ADJUST
const domain2 = "http://localhost:3001"; //ADJUST
const TOPICS = ['sender1', 'common'];
const RABBITMQ_URL = 'amqp://localhost'; // Replace with your RabbitMQ server URL
const FANOUT_EXCHANGE_NAME = 'fanout_exchange';
const TOPIC_EXCHANGE_NAME = 'topic_logs';
const QUEUE_NAME = ''; // Let RabbitMQ generate a queue name
function startReceiver() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to RabbitMQ
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            console.log('Connected to RabbitMQ');
            const channel = yield connection.createChannel();
            console.log('Channel created');
            // Assert exchange
            yield channel.assertExchange(FANOUT_EXCHANGE_NAME, 'fanout', { durable: false });
            console.log(`Exchange '${FANOUT_EXCHANGE_NAME}' asserted`);
            channel.assertExchange(TOPIC_EXCHANGE_NAME, 'topic', { durable: false });
            console.log(`Exchange '${TOPIC_EXCHANGE_NAME}' asserted`);
            // Assert a queue
            const { queue } = yield channel.assertQueue(QUEUE_NAME);
            yield channel.bindQueue(queue, FANOUT_EXCHANGE_NAME, ``);
            console.log(`Queue '${queue}' created and bound to exchange '${FANOUT_EXCHANGE_NAME}'`);
            // await channel.bindQueue(queue, TOPIC_EXCHANGE_NAME, `${getRoutingKey()}`);
            // console.log(`Queue '${queue}' bound to exchange '${TOPIC_EXCHANGE_NAME}'`);
            // Bind the queue to the exchange with specified topics
            for (const topic of TOPICS) {
                yield channel.bindQueue(queue, TOPIC_EXCHANGE_NAME, topic);
                console.log(`Queue '${queue}' bound to topic '${topic}'`);
            }
            console.log(`Waiting for messages on topics: ${getTopics()}`);
            // Consume messages
            // message must be modified and sent via post request to servers.
            channel.consume(queue, (msg) => {
                if (msg) {
                    //console.log(msg);
                    console.log(`Received message on topic '${msg.fields.routingKey || 'common'}':`, msg.content.toString());
                    channel.ack(msg);
                }
            });
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    });
}
function getRoutingKey() {
    return TOPICS.join('.');
}
function getTopics() {
    return TOPICS.join(', ') + '.';
}
startReceiver();

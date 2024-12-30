"use strict";
// sends messages of type INFO NEWS
// fanout based.
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
function sendToFanoutExchange() {
    return __awaiter(this, void 0, void 0, function* () {
        const exchangeName = 'fanout_exchange';
        try {
            // Connect to RabbitMQ server
            const connection = yield amqplib_1.default.connect('amqp://localhost'); // Replace with your RabbitMQ server address
            const channel = yield connection.createChannel();
            // Assert the exchange (type: fanout)
            yield channel.assertExchange(exchangeName, 'fanout', {
                durable: false, // Messages won't survive a broker restart
            });
            // Function to publish messages continuously
            const sendMessage = () => {
                const message = { text: `${getTopic()} sendera ${new Date().getTime()}` };
                channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
                console.log(`Message sent to fanout exchange: ${JSON.stringify(message)}`);
            };
            // Send messages at regular intervals
            setInterval(sendMessage, 4000); // Sends a message every 1 second
            console.log('Press Ctrl+C to exit and stop sending messages.');
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    });
}
// Helper function to generate topic
function getTopic() {
    const topics = ['news', 'info'];
    return topics[Math.floor(Math.random() * topics.length)];
}
sendToFanoutExchange();

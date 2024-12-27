// sends messages of type INFO NEWS

import amqp from 'amqplib';

async function sendToFanoutExchange() {
    const exchangeName = 'fanout_exchange';

    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ server address
        const channel = await connection.createChannel();

        // Assert the exchange (type: fanout)
        await channel.assertExchange(exchangeName, 'fanout', {
            durable: false, // Messages won't survive a broker restart
        });

        // Function to publish messages continuously
        const sendMessage = () => {
            const message = { text: `Message sent at ${new Date().toISOString()}` };
            channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
            console.log(`Message sent to fanout exchange: ${JSON.stringify(message)}`);
        };

        // Send messages at regular intervals
        setInterval(sendMessage, 1000); // Sends a message every 1 second

        console.log('Press Ctrl+C to exit and stop sending messages.');
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

sendToFanoutExchange();


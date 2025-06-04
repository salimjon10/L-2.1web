import express from 'express';
import mongoose from 'mongoose';
import amqp, { Channel, ConsumeMessage } from 'amqplib';
import axios from 'axios';
import config from './utils/config';
import enrollmentRoute from './routes/EnrollmentRoute';
import { errorHandler } from './middlewares/errorMiddleware';
import { setStatusQueue } from './utils/setStatusQueue';
import { authenticateToken } from './middlewares/authenticateMiddleware';

const { port, enrollemntServiceUrl: enrollmentUrl, queue: enrollmentQueue, mongoURL: dbUrl, rabbitMQUrl } = config;

const app = express();

app.use(express.json());

app.use(`/api`, authenticateToken, enrollmentRoute);
app.use(errorHandler);

async function processMessage(channel: Channel, msg: ConsumeMessage | null) {
    if (!msg) return;

    try {
        const message = JSON.parse(msg.content.toString());
        const { requestId, path, method, body, query, headers } = message;

        const url = `${enrollmentUrl}:${port}/api/${path}`;

        const axiosConfig = {
            method: method,
            url: url,
            params: query,
            data: body,
            headers: headers,
            validateStatus: (status: number) => status >= 200 && status < 600,
        };

        const response = await axios(axiosConfig);
        const statusText = response.status <= 300 && response.status >= 200 ? "Выполнено" : `Ошибка: ${response.status}`;
        const messageText = response.status <= 300 && response.status >= 200 ? "Запрос выполнен успешно" : "При выполнении запроса произошла ошибка";

        setStatusQueue(requestId, response.data, statusText, messageText);
        channel.ack(msg);

    } catch (error) {
        console.error("Ошибка при обработке сообщения:", error);
        channel.ack(msg);
    }
}

async function connectRabbitMQ() {
    let retries = 5;
    const delay = 5000;

    while (retries) {
        try {
            const connection = await amqp.connect(rabbitMQUrl);
            const channel = await connection.createChannel();

            await channel.assertQueue(enrollmentQueue, { durable: false });

            console.log('[*] Ожидает сообщения из очереди:', enrollmentQueue);

            channel.consume(enrollmentQueue, (msg) => processMessage(channel, msg), { noAck: false });

            console.log('Подключено к RabbitMQ');
            return;

        } catch (err) {
            console.log(`Ошибка подключения к RabbitMQ, повторная попытка через ${delay / 1000} секунд...`, err);
            retries--;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    console.error(`Ошибка подключения к RabbitMQ после нескольких попыток.`);
    process.exit(1);
}

const connectDB = async (retryCount = 0) => {
    const maxRetries = 5;
    try {
        await mongoose.connect(dbUrl!);
        console.log('Подключено к MongoDB');
        connectRabbitMQ().then(() => {
            app.listen(port, () => {
                console.log(`[x] Enrollment Service запущен на порту: ${port}`);
            });
        });
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
        if (retryCount < maxRetries) {
            setTimeout(() => connectDB(retryCount + 1), 5000);
        } else {
            console.error('Превышено максимальное количество попыток подключения к базе данных.');
            process.exit(1);
        }
    }
};

connectDB();
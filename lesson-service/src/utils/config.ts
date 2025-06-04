import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3005,
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    lessonServiceUrl: "http://lesson-service",
    userServiceUrl: 'http://user-service:3001',
    mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
    rabbitMQUrl: 'amqp://rabbitmq:5672',
    statusServiceUrl: 'http://status-service:3002',
    queue: 'lesson_queue',
};

export default config;
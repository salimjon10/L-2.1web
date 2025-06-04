import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3007,
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    enrollemntServiceUrl: "http://enrollment-service",
    userServiceUrl: 'http://user-service:3001',
    lessonServiceUrl: 'http://lesson-service:3005',
    mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
    rabbitMQUrl: 'amqp://rabbitmq:5672',
    statusServiceUrl: 'http://status-service:3002',
    queue: 'enrollment_queue',
};

export default config;
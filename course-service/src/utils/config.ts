import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3003,
	jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    courseServiceUrl: 'http://course-service',
    userServiceUrl: 'http://user-service:3001',
    mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
    rabbitMQUrl: 'amqp://rabbitmq:5672',
    statusServiceUrl: 'http://status-service:3002',
    queue: 'course_queue',
};

export default config;
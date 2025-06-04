import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3004,	
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    tagServiceUrl: "http://tags-service",
    mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
    rabbitMQUrl: 'amqp://rabbitmq:5672',
    statusServiceUrl: 'http://status-service:3002',
    userServiceUrl: 'http://user-service:3001',
    queue: 'tag_queue',
};

export default config;
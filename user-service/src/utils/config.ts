import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3001,
	userServiceUrl: 'http://user-service',
	mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
	jwtSecret: process.env.JWT_SECRET || "your-secret-key",
	rabbitMQUrl: 'amqp://rabbitmq:5672',
	queue: 'user_queue',
	statusServiceUrl: 'http://status-service:3002',
};

export default config;
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3000,
	rabbitMQUrl: 'amqp://rabbitmq:5672',
	statusServiceUrl: 'http://status-service:3002',
	userServiceQueue: 'user_queue',
    lessonServiceQueue: 'lesson_queue',
	courseServiceQueue: 'course_queue',
    commentServiceQueue: 'comment_queue',
	enrollmentServiceQueue: 'enrollment_queue',
	tagServiceQueue: 'tag_queue',
};

export default config;
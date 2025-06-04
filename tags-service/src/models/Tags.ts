import { Schema, model } from 'mongoose';

interface ITags {
	_id: string;
	tag: string;
}

const CourseSchema: Schema = new Schema<ITags>({
	tag: {
		type: String,
		required: true,
	},
});

const Tags = model<ITags>('tags', CourseSchema);

export default Tags;
export { ITags };
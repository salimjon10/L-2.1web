import { Schema, model } from "mongoose";

interface ILessons {
  _id: string;
  title: string;
  content: string;
  videoUrl: string;
  course: Schema.Types.ObjectId;
  order: number;
  createdAt: number;
}

const LessonSchema: Schema = new Schema<ILessons>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  order: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

const Lesson = model<ILessons>("lessons", LessonSchema);

export default Lesson;
export { ILessons };
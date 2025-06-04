import { Schema, model } from "mongoose";

interface IComments {
  _id: string;
  user: string;
  lesson: string;
  text: string;
}

const LessonSchema: Schema = new Schema<IComments>({
  user: {
    type: String,
    required: true,
  },
  lesson: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

const Comment = model<IComments>("comments", LessonSchema);

export default Comment;
export { IComments };
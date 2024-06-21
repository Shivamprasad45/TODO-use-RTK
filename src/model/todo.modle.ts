import mongoose, { Schema, Document, Model } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;

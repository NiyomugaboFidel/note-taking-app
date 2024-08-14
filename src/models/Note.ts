import mongoose, { Schema, Document, Model } from 'mongoose';

interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
}

const NoteSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Check if the model is already compiled before defining it
const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);

export default Note;

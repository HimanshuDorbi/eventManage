import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  organizer: Schema.Types.ObjectId;
  attendees: Schema.Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true }, 
  organizer: { type: String, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model<IEvent>('Event', eventSchema);

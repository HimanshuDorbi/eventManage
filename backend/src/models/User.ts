import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  username: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  username: { type: String, unique: true, required: true },
  role: { type: String, default: 'attendee' } // Default role = 'attendee'
});

export default mongoose.model<IUser>('User', UserSchema);

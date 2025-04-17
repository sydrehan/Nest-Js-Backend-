// src/users/user.schema.ts
import { Schema, Document } from 'mongoose';

// Create UserDocument interface extending Document
export interface UserDocument extends Document {
  email: string;
  password: string;
}

// Define the User schema
export const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export User class and schema
export class User {
  email: string;
  password: string;
}

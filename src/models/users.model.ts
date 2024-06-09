import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Pre-save hook to ensure unique username from email if username is not provided
userSchema.pre('save', async function (next) {
  const user = this as User & Document;

  if (user.username && !user.isModified('username')) {
    return next();
  }

  const generateUniqueUsername = async (desiredUsername: string): Promise<string> => {
    let username = desiredUsername.trim().toLowerCase(); // Normalize the username
    let userExists = await userModel.exists({ username });
    let counter = 1;

    while (userExists) {
      // Append a counter to the username to create a new candidate
      username = `${desiredUsername.trim().toLowerCase()}${counter}`;
      userExists = await userModel.exists({ username });
      counter++;
    }

    return username;
  };

  // Generate a unique username from email if username is not set or modified
  if (!user.username) {
    const emailBase = user.email.split('@')[0];
    user.username = await generateUniqueUsername(emailBase);
  }

  next();
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;

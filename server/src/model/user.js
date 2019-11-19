/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

// This is called a pre-hook, before the user information is saved in the database
// this function will be called, we'll get the plain text password, hash it and store it.
UserSchema.pre('save', async function onSave(next) {
  // 'this' refers to the current document about to be saved
  // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  // your application becomes.
  const hash = await bcrypt.hash(this.password, 10);
  // Replace the plain text password with the hash and then store it
  this.password = hash;
  // Indicates we're done and moves on to the next middleware
  next();
});

// We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const user = this;
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

function handleE11000(error, res, next) {
  console.error(error);
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Account already exists'));
  } else {
    next();
  }
}

UserSchema.post('save', handleE11000);
UserSchema.post('update', handleE11000);
UserSchema.post('findOneAndUpdate', handleE11000);
UserSchema.post('insertMany', handleE11000);

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;

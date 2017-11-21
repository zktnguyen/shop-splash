import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true
  },
  passwordHash: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

export function cryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function comparePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return comparePassword(password);
};

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = cryptPassword(password);
};

userSchema.methods.setAdminRights = function setAdmin(right) {
  this.admin = right;
};

// creates a json web token with email given
userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    'secretkey20010'
  );
};

// This returns an object with the email of the user logging in / signing up
// token helps identify if the user is authenticated.
userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

userSchema.plugin(uniqueValidator, { message: 'Not a unique e-mail provided' });

const User = mongoose.model('User', userSchema);
export default User;

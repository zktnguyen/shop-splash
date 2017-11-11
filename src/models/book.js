import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number
});

const Book = mongoose.model('Book', bookSchema);
export default Book;

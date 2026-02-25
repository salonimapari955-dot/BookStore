import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name:{
         type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
const mongoose = require("mongoose");

// MongoDB schema representing a library book.
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minlength: 1,
      maxlength: 200,
    },

    author: {
      type: String,
      required: [true, "Author is required."],
      trim: true,
      minlength: 1,
      maxlength: 150,
    },

    isbn: {
      type: String,
      required: [true, "ISBN is required."],
      trim: true,
      uppercase: true,
      maxlength: 32,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "General",
    },

    publishedYear: {
      type: Number,
      min: 0,
      max: new Date().getFullYear() + 1,
    },

    available: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Text index for future MongoDB text-search queries.
bookSchema.index({
  title: "text",
  author: "text",
  isbn: "text",
});

module.exports = mongoose.model("Book", bookSchema);

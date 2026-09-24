const Book = require("../models/Book");

// Forward rejected async controller promises to Express error middleware.
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

/**
 * Create a new book.
 */
const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    data: book,
  });
});

/**
 * Get books with optional search, availability filtering and pagination.
 */
const getBooks = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const filter = {};

  if (req.query.search) {
    const search = String(req.query.search).trim().replace(/[.*+?^{}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(search, "i");

    filter.$or = [
      { title: pattern },
      { author: pattern },
      { isbn: pattern },
    ];
  }

  if (req.query.available !== undefined) {
    filter.available = req.query.available === "true";
  }

  const [books, total] = await Promise.all([
    Book.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Book.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: books,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get one book by MongoDB ObjectId.
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).lean();

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * Update an existing book.
 */
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * Delete a book.
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Book deleted successfully.",
  });
});

/**
 * Update only the availability status.
 */
const updateAvailability = asyncHandler(async (req, res) => {
  if (typeof req.body.available !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "The available field must be a boolean.",
    });
  }

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { available: req.body.available },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateAvailability,
};

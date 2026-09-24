const express = require("express");
const mongoose = require("mongoose");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateAvailability,
} = require("../controllers/bookController");

const router = express.Router();

// Validate MongoDB IDs before reaching the controller.
const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid book ID.",
    });
  }

  next();
};

router.route("/").get(getBooks).post(createBook);

router
  .route("/:id")
  .get(validateObjectId, getBookById)
  .patch(validateObjectId, updateBook)
  .delete(validateObjectId, deleteBook);

router.patch(
  "/:id/availability",
  validateObjectId,
  updateAvailability
);

module.exports = router;

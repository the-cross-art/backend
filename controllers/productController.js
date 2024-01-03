// productController.js

const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Note
exports.createNote = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const note = await Product.create(req.body);

  res.status(201).json({
    success: true,
    note,
  });
});

// Get All Notes
exports.getAllNotes = catchAsyncErrors(async (req, res, next) => {
  const allNotes = await Product.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    allNotes,
  });
});

// Get Note Details
exports.getNoteDetails = catchAsyncErrors(async (req, res, next) => {
  const note = await Product.findOne({ _id: req.params.id, user: req.user.id });

  if (!note) {
    return next(new ErrorHander("Note not found", 404));
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// Update Note
exports.updateNote = catchAsyncErrors(async (req, res, next) => {
  let note = await Product.findOne({ _id: req.params.id, user: req.user.id });

  if (!note) {
    return next(new ErrorHander("Note not found", 404));
  }

  note = await Product.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    note,
  });
});

// Delete Note
exports.deleteNote = catchAsyncErrors(async (req, res, next) => {
  const note = await Product.findOne({ _id: req.params.id, user: req.user.id });

  if (!note) {
    return next(new ErrorHander("Note not found", 404));
  }

  await note.deleteOne();

  res.status(200).json({
    success: true,
    message: "Note Deleted Successfully",
  });
});

// Share Note
exports.shareNote = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;

  // Find the note
  const note = await Product.findOne({ _id: id, user: req.user.id });

  if (!note) {
    return next(new ErrorHander("Note not found", 404));
  }
  // Find the user to share with
  const userToShareWith = await User.findOne({ email });


  if (!userToShareWith) {
    return next(new ErrorHander("User not found", 404));
  }

  // Create a copy of the note for the userToShareWith
  const sharedNote = new Product({
    notes: note.notes,
    user: userToShareWith._id,
  });

  await sharedNote.save();


  res.status(200).json({
    success: true,
    message: `Note shared successfully with ${userToShareWith.email}`,
  });
});

// Search Notes
exports.searchNotes = catchAsyncErrors(async (req, res, next) => {
  const { q } = req.query;

  // Implement a case-insensitive text search using regular expressions
  const searchResults = await Product.find({
    user: req.user.id,
    notes: { $regex: new RegExp(q, "i") },
  });

  res.status(200).json({
    success: true,
    searchResults,
  });
});
const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  notes: {
    type: String,
    required: [true, "Please Enter note"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Note", noteSchema);

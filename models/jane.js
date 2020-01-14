const mongoose = require("mongoose");

const janeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jane", janeSchema);

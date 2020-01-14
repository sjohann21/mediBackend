
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 25,
    unique: true
  },
  address: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100
  },
  address2: {
    type: String,
    trim: true,
    maxlength: 100
  },
  city: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30
  },
  state: {
    type: String,
    trim: true,
    required: true,
    maxlength: 02
  },
  zip: {
    type: String,
    trim: true,
    required: true,
    maxlength: 5
  },
  contact: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    maxlength: 13
  },
  description: {
    type: String,
    maxlength: 2000
  }
});
clinicSchema.set('timestamps', true)

module.exports = mongoose.model("Clinic", clinicSchema);


// const mongoose = require("mongoose");

// const clinicSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 32
//     },
//     email: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 32,
//       unique: true
//     },
//     password: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 32
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Clinic", clinicSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  id: Number,
  email: String,
  phone: String
});

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  mode: {
    type: String
  },
  hours: {
    type: Number
  },
  avaliable: {
    type: String,
    default: "disponible"
  },
  suscribed: {
    type: [UserSchema]
  }
});

module.exports = mongoose.model("Course", CourseSchema);

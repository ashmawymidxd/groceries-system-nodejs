// this is schema for groceries model

const mongoose = require("mongoose");
const { Schema } = mongoose;

const grocSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    default: "user",
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

module.exports = mongoose.model("grocs", grocSchema);
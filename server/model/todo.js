const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;

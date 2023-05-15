const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  tasks: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

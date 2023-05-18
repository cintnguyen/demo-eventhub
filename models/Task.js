const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },
  eventID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

const mongoose = require("mongoose");

// type Guest = {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//   },
//   number: {
//     type: String,
//   },
//   inviteStatus: {
//     type: String,
//   },
// }

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  guests: {
    type: Array,
  },
  tasks: {
    type: Array,
  }
});

module.exports = mongoose.model("Event", EventSchema);

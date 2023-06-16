const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const Event = require("../models/Event")

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user._id });
      res.render("dashboard.ejs", { events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const image = {
        photoURL: result.secure_url,
        cloudinaryId: result.public_id,
      }
      const event = {
        address: req.body.address,
        date: req.body.date,
        user: req.user.id,
        userName: req.user.userName,
        createdAt: new Date(),
        guests: [],
        tasks: [],
        name: req.body.name,
        eventImage: image,
      }
      console.log(event)
      await Event.create(event);
      console.log("Event has been added!");
      res.redirect("/dashboard#cnevents");
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("event.ejs", { event, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      event.deleteOne({_id: event.id})
      res.redirect(`/dashboard#cnevents`);
    } catch (err) {
      console.log(err);
    }
  },
};

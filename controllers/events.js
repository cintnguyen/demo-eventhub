const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
// const Contact = require("../models/Contact")
const Event = require("../models/Event")
// const Task = require("../models/Task")
const { sendText } = require("../helpers/twilio.js")

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user._id });
      res.render("dashboard.ejs", { events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // createComment: async (req, res) => {
  //   try {
  //     await Comment.create({
  //       comment: req.body.comment,
  //       user: req.user.id,
  //       postId : req.params.id
  //     });
  //     console.log("Comment has been added!");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createEvent: async (req, res) => {
    try {
      await Event.create({
        address: req.body.address,
        date: req.body.date,
        user: req.user.id,
        userName: req.user.userName,
        createdAt: new Date(),
        guests: [],
        tasks: [],
        name: req.body.name,
        images: [],
      });
      console.log("Event has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
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
      // const guestIndex = Number(req.body.guest)
      // const invitedGuest = event.guests[guestIndex]
      //event.markModified('guests'); // method for mongoose to recognize that we made changes to the guest array 
      // await event.save()
      res.redirect(`/dashboard`);
    } catch (err) {
      console.log(err);
    }
  },
};

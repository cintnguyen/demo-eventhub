const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const Contact = require("../models/Contact")
const Event = require("../models/Event")
const Task = require("../models/Task")
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
  getContacts: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const invitedGuests = event.guests.filter((guest) => guest.invited)
      res.render("contacts.ejs", { guests: event.guests ? event.guests : [], event, user: req.user, invitedGuests });
    } catch (err) {
      console.log(err);
    }
  },
  getToDoList: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
    // const list = await generateList({
// pass in the things you think open ai will need
    // })
      // event.tasks = list
      // event.markModified('tasks');
      // await event.save()
      res.render("todos.ejs", { list });
    } catch (err) {
      console.log(err);
    }
  },
  getPhotoboard: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("photoboard.ejs", { event, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getMaps: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("maps.ejs", { address: event.address, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        postId : req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  sendText: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const invitedGuests = event.guests.filter((guest) => guest.invited)
      sendText({
        list: invitedGuests, 
        eventName: event.name,
        date: event.date,
        host: event.userName,
        // add prop to send a link to the page once this is hosted
      })
      res.redirect(`/contacts/${event.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  addGuest: async (req, res) => {
    try {
      const guest = {
        phoneNumber: req.body.number,
        email: req.body.email,
        name: req.body.name,
        invited: false,
      }
      const event = await Event.findById(req.params.id);
      event.guests.push(guest)
      await event.save()
      res.redirect(`/contacts/${event.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
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
      });
      console.log("Event has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  inviteGuest: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const guestIndex = Number(req.body.guest)
      const invitedGuest = event.guests[guestIndex]
      console.log({invitedGuest})
      invitedGuest.invited = true
      event.markModified('guests'); // method for mongoose to recognize that we made changes to the guest array 
      await event.save()
      res.redirect(`/contacts/${event.id}`);
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
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  }
};

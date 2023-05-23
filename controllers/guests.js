const Event = require("../models/Event")
const { sendText } = require("../helpers/twilio.js")

module.exports = {
  getContacts: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const invitedGuests = event.guests.filter((guest) => guest.invited)
      res.render("guests.ejs", { 
        guests: event.guests ? event.guests : [], event, 
        user: req.user, 
        invitedGuests, 
        eventName: event.name,
        date: event.date,
        host: event.userName, });
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
        userText: req.body.userText,
        //photoboardURL: `${}`
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
  deleteGuest: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const guestIndex = Number(req.body.guest)
      const invitedGuest = event.guests[guestIndex]
      console.log({invitedGuest})
      event.guests.splice(guestIndex, 1);
      event.markModified('guests'); // method for mongoose to recognize that we made changes to the guest array 
      await event.save()
      res.redirect(`/contacts/${event.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};

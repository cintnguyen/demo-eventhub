const Event = require("../models/Event")

module.exports = {
  getMaps: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("maps.ejs", { eventID: event._id, address: event.address, user: req.user, eventName: event.name,});
    } catch (err) {
      console.log(err);
    }
  },
};

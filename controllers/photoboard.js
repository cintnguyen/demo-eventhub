const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event")


module.exports = {
  getPhotoboard: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("photoboard.ejs", { event, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  addPhoto: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const photo = {
        fromName: req.body.fromName,
        photoURL: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user ? req.user.id : null ,
      }
      event.photos.push(photo)
      await event.save()
      console.log("Photo has been added!");
      res.redirect(`/photoboard/${event.id}#cnphoto`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePhoto: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      // Upload image to cloudinary
      console.log(`from the event ${req.params.id} splice out the photo from the photos array with the index ${req.params.photoIndex}` )
      console.log(event.photos)
      await cloudinary.uploader.destroy(event.photos[0].cloudinaryId)
      event.photos.splice(req.params.photoIndex,1)
      await event.save()
      console.log("Photo has been added!");
      res.redirect(`/photoboard/${event.id}#cnphoto`);
    } catch (err) {
      console.log(err);
    }
  },
};
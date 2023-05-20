const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const eventsController = require("../controllers/events");
const photoboardController = require("../controllers/photoboard");
const todosController = require("../controllers/todos");
const mapsController = require("../controllers/maps");
const guestsController = require("../controllers/guests");
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//Dashboard
router.get("/dashboard", ensureAuth, eventsController.getDashboard);
router.post("/createEvent", eventsController.createEvent);
router.get("/events/:id", ensureAuth, eventsController.getEvent);
router.delete("/dashboard/:id", eventsController.deleteEvent);

//Guests 
router.get("/contacts/:id", ensureAuth, guestsController.getContacts);
router.post("/addGuest/:id", guestsController.addGuest);

//Google Maps
router.get("/maps/:id", mapsController.getMaps);


//PhotoBoard
router.get("/photoboard/:id", photoboardController.getPhotoboard);
router.put("/addPhoto/:id", upload.single("file"), photoboardController.addPhoto);
router.delete("/deletePhoto/:id/:photoIndex", photoboardController.deletePhoto);

// router.all("/todos/:id", ensureAuth, todosController.getToDoList);
router.get("/todos/:id", ensureAuth, todosController.getToDoList);
router.post("/todos/:id", ensureAuth, todosController.postToDoList);
router.get("/todos/:id/clearAll", ensureAuth, todosController.clearToDoList);
router.delete("/todos/:id", todosController.deleteTask);

module.exports = router;

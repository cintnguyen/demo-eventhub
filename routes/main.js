const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const todosController = require("../controllers/todos");
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
router.get("/dashboard", ensureAuth, postsController.getDashboard);
router.post("/createEvent", postsController.createEvent);
router.get("/events/:id", ensureAuth, postsController.getEvent);

//Invitations 
router.get("/contacts/:id", ensureAuth, postsController.getContacts);
router.post("/addGuest/:id", postsController.addGuest);

//Google Maps
router.get("/maps/:id", postsController.getMaps);


//PhotoBoard
router.get("/photoboard/:id", postsController.getPhotoboard);
router.put("/addPhoto/:id", upload.single("file"), postsController.addPhoto);
router.delete("/deletePhoto/:id/:photoIndex", postsController.deletePhoto);

// router.all("/todos/:id", ensureAuth, todosController.getToDoList);
router.get("/todos/:id", ensureAuth, todosController.getToDoList);
router.post("/todos/:id", ensureAuth, todosController.postToDoList);
router.get("/todos/:id/clearAll", ensureAuth, todosController.clearToDoList);
router.delete("/todos/:id", todosController.deleteTask);

module.exports = router;

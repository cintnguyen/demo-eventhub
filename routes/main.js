const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, postsController.getDashboard);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/createEvent", postsController.createEvent);
router.get("/events/:id", ensureAuth, postsController.getEvent);
router.get("/contacts/:id", ensureAuth, postsController.getContacts);
router.get("/maps/:id", postsController.getMaps);
router.get("/photoboard/:id", postsController.getPhotoboard);
router.get("/todoList/:id", postsController.getToDoList);
router.post("/addGuest/:id", postsController.addGuest);

module.exports = router;

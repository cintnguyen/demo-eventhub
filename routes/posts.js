const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.post("/createPost", upload.single("file"), postsController.createPost);
// router.post("/createComment/:id", postsController.createComment);
router.put("/invite/:id", postsController.inviteGuest);
router.delete("/invite/:id", postsController.deleteGuest);
router.put("/sendText/:id", postsController.sendText);
// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

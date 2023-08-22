const express = require("express");
const router = express.Router();
const { post_create, posts_get, single_post_get, post_update, post_delete } = require("../controllers/postController");
const { isAuth, isOwner } = require("../middlewares/authMiddleware");

router.post("/", isAuth, post_create);
router.get("/", posts_get);
router.get("/:postId", single_post_get);
router.patch("/:postId", isAuth, isOwner, post_update);
router.delete("/:postId", isAuth, isOwner, post_delete);

module.exports = router;
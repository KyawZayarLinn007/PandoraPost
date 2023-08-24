const express = require("express");
const router = express.Router();
const { register_post, login_post, logout_post, verify_auth_post } = require("../controllers/authController");

router.post("/register", register_post);
router.post("/login", login_post);
router.post("/logout", logout_post);
router.post("/verify-auth", verify_auth_post);

module.exports = router;
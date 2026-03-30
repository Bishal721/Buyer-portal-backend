const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginStatus,
  logoutUser,
  getUser,
} = require("../controller/userController");
const { Protected, adminOnly } = require("../middleware/authMiddleware");

//Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logoutUser);
router.get("/getuser", Protected, getUser);

module.exports = router;

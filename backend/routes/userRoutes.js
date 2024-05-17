const express = require("express");
const router = express.Router();
const {
  signUpValidation,
  loginValidation,
  forgetValidation,
} = require("../utils/validation.js");
const { isAuthorized } = require("../middlewares/auth");
const {
  register,
  getEmailFromResetPassword,
  verifyMail,
  getAllUsers,
  login,
  getUser,
  logOut,
  disableUser,
  disableUserById,
  forgotPassword,
} = require("../controllers/userController");

router.post("/register", signUpValidation, register);

router.post("/login", loginValidation, login);

router.get("/get-user", isAuthorized, getUser);
router.get("/users", getAllUsers);

router.get("/logout", logOut);

router.post("/disable-user", disableUser);
router.put("/disable-user-by-id", disableUserById);

router.post("/forgot-password", forgetValidation, forgotPassword);
router.get("/get-email", getEmailFromResetPassword);
module.exports = router;

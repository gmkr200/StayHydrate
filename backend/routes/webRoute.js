const express = require("express");
const user_route = express();

user_route.set("view engine", "ejs");
user_route.set("views", "./views");

user_route.use(express.static("public"));

const {
  verifyMail,
  resetPasswordLoad,
  resetPassword,
} = require("../controllers/userController");
user_route.get("/mail-verification", verifyMail);
user_route.get("/reset-password", resetPasswordLoad);
user_route.post("/reset-password", resetPassword);

module.exports = user_route;

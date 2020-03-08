const express = require("express");
const usersController = require("../controllers/users-controller");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [check("username").notEmpty(), check("password").isLength({ min: 6 })],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;

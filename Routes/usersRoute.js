const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../Middleware/validateRequest");
const endpoint_users = require("../Controller/userEndpoints");
 
router.get("/allusers", endpoint_users.getAllUsers);

router.post(
  "/register",
  [
    body("firstName").isString().notEmpty(),
    body("lastName").isString().notEmpty(),
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  validateRequest,
  endpoint_users.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  validateRequest,
  endpoint_users.LoginUser
);

module.exports = router;

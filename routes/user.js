const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAdmin = require("../middlewares/isAdmin");
const validator = require("../middlewares/validator");
const isAuth = require("../middlewares/isAuth");

router.post(
  "/register",
  validator.registerValidator(),
  validator.validation,
  userController.register
);

router.post(
  "/login",
  validator.loginValidator(),
  validator.validation,
  userController.login
);
router.get("/current", isAuth,(req, res) => {
    res.send({user : req.user})
});

module.exports = router;
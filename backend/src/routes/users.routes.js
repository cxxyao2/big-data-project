const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");

router.get("/all-users", controller.getAllUsers);

module.exports = router;

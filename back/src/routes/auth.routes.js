const express = require('express');
const { login, logout, signup } = require("../controllers/auth.controller.js");

const router = express.Router();

router.get("/login", login);

router.post("/signup", signup );

router.get("/logout", logout);

module.exports = router;
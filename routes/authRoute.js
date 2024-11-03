// authRoute.js
const express = require('express');
const { signUp, logIn } = require('../controller/authController');

const router = express.Router();

router.post('/candidate/signup', signUp);
router.post('/candidate/login', logIn);

module.exports = router;

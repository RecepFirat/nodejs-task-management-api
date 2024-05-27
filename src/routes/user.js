// userRoute.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/emails', userController.getAllUserEmails);

module.exports = router;

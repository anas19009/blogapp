// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authentication');

router.post('/', userController.createUser);
router.post('/login', authenticateUser, userController.loginUser);

module.exports = router;

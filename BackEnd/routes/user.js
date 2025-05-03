const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/user');

// POST /api/users - Signup
router.post('/', createUser);

// POST /api/users/login - Login
router.post('/login', loginUser);

module.exports = router;
const express = require('express');
const { createUser, loginUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser); // Fixed PUT route with parameter
router.delete('/:id', deleteUser); // Add DELETE route

module.exports = router;
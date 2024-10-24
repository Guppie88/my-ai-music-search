const express = require('express');
const { createNewUser, getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Create
router.post('/', createNewUser);

// Read (get all)
router.get('/', getAllUsers);

// Read (get one by ID)
router.get('/:id', getUserById);

// Update
router.put('/:id', updateUser);

// Delete
router.delete('/:id', deleteUser);

module.exports = router;

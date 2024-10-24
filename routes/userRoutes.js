const express = require('express');
const { createNewUser, getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/userController.js');
const router = express.Router();

// CRUD-rutter för /users
router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

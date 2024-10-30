import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// CRUD-rutter för /users
router.post('/', userController.createNewUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export { router };

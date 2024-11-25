import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createNewUser); // Skapa ny användare
router.get('/', userController.getAllUsers); // Hämta alla användare
router.get('/:id', userController.getUserById); // Hämta en användare med ID
router.put('/:id', userController.updateUser); // Uppdatera en användare
router.delete('/:id', userController.deleteUser); // Ta bort en användare

export default router;

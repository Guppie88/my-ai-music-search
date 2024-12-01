import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Endpoints för användare
router.post('/', userController.createNewUser); // Skapa ny användare
router.get('/', userController.getAllUsers); // Hämta alla användare
router.get('/:id', userController.getUserById); // Hämta specifik användare med ID
router.put('/:id', userController.updateUser); // Uppdatera användare
router.delete('/:id', userController.deleteUser); // Ta bort användare

export default router;

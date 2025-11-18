import express from 'express';
import UserController from '../controller/Usuario_Controller.js';

const router = express.Router();

router.get('/', UserController.PaginaUserLogin);
router.post("/auth", UserController.authentication);
router.get('/new', UserController.PaginaUser);
router.post('/add', UserController.addNewUser);
router.get('/dashboard', UserController.getDashboard);
router.get('/logout', UserController.logout); 

export default router;
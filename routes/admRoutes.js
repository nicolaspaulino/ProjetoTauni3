import express from 'express';
import admController from '../controller/Admin_Controller.js';

const router = express.Router();

router.get('/', admController.PaginaAdmLogin);
router.post('/auth', admController.authentication);
router.get('/auth/new', admController.PaginaAdm);
router.post('/auth/add', admController.addNewAdm);
router.get('/dashboard', admController.getDashboard);
router.get('/logout', admController.logout); 

export default router;

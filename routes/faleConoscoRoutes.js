import express from 'express';
import faleController from '../controller/faleConosco_Controller.js';

const router = express.Router();

router.get('/new', faleController.PaginaFale);
router.post('/add', faleController.addNewMessage);

export default router;

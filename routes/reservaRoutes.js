import express from 'express';
import ReservaController from '../controller/reserva_Controller.js'; 
const router = express.Router();

router.get('/new', ReservaController.PaginaReserva);
router.post('/add', ReservaController.addNewReserve);

export default router;

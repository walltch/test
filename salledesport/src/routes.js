import express from 'express';
import { memberController } from './controllers/memberController.js';
import { reservationController } from './controllers/reservationController.js';

const router = express.Router();

router.get('/register', (req, res) => res.sendFile(__dirname + '/views/memberRegistration.html'));
router.post('/members', memberController);

router.get('/gyms', (req, res) => res.sendFile(__dirname + '/views/gymSelection.html'));
router.get('/machines', (req, res) => res.sendFile(__dirname + '/views/machineSelection.html'));
router.post('/reservations', reservationController);
router.get('/confirmation', (req, res) => res.sendFile(__dirname + '/views/reservationConfirmation.html'));

export default router;
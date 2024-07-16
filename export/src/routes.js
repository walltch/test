const express = require('express');
const router = express.Router();
const memberController = require('./controllers/memberController');
const reservationController = require('./controllers/reservationController');

router.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!memberController.validateMemberRegistration(req.body)) {
        return res.status(400).send('Invalid member registration data');
    }
    try {
        const newMember = memberController.registerMember(firstName, lastName, email, password);
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/reservation', (req, res) => {
    const { memberId, gymId, machines } = req.body;
    if (!reservationController.validateReservation(req.body)) {
        return res.status(400).send('Invalid reservation data');
    }
    try {
        const newReservation = reservationController.createReservation(memberId, gymId, machines);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

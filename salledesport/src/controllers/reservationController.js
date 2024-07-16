import Reservation from '../models/reservation.js';

export async function reservationController(req, res) {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
}
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  gym: {
    type: String,
    required: true
  },
  machine: {
    type: String,
    required: true
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

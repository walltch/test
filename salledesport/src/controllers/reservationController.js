const Reservation = require('../models/reservation');

function validateReservation(data) {
    if (!data.memberId || !data.gymId || !data.machines) {
        return false;
    }
    return true;
}

function createReservation(memberId, gymId, machines) {
    return Reservation.addReservation(memberId, gymId, machines);
}

module.exports = {
    validateReservation,
    createReservation
};

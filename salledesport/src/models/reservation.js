let reservations = [];

function addReservation(memberId, gymId, machines) {
    const newReservation = {
        id: reservations.length + 1,
        memberId,
        gymId,
        machines,
        timestamp: new Date()
    };
    reservations.push(newReservation);
    return newReservation;
}

module.exports = {
    addReservation
};

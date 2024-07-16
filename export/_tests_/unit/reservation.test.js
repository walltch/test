const Reservation = require('../../src/models/reservation');
const { validateReservation, createReservation } = require('../../src/controllers/reservationController');

test('Validate reservation', () => {
    const validReservationData = {
        memberId: 1,
        gymId: 1,
        machines: ['Treadmill', 'Bench Press']
    };
    expect(validateReservation(validReservationData)).toBe(true);

    const invalidReservationData = {
        memberId: 1,
        gymId: 1
    };
    expect(validateReservation(invalidReservationData)).toBe(false);
});

test('Create reservation', () => {
    const newReservation = createReservation(1, 1, ['Treadmill', 'Bench Press']);
    expect(newReservation.memberId).toBe(1);
    expect(newReservation.gymId).toBe(1);
    // Add more assertions as needed
});

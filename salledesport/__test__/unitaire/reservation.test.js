const mongoose = require('mongoose');
const Reservation = require('../../src/models/reservation');

describe('Reservation Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new reservation', async () => {
    const reservationData = { memberId: new mongoose.Types.ObjectId(), gym: 'Salle A', machine: 'Machine 1' };
    const reservation = new Reservation(reservationData);
    const savedReservation = await reservation.save();

    expect(savedReservation._id).toBeDefined();
    expect(savedReservation.memberId).toBe(reservationData.memberId);
    expect(savedReservation.gym).toBe(reservationData.gym);
    expect(savedReservation.machine).toBe(reservationData.machine);
  });
});

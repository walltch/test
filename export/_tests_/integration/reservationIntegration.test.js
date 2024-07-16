const request = require('supertest');
const app = require('../../src/app');
const Reservation = require('../../src/models/reservation');

afterEach(() => {
    Reservation.reservations = [];
});

test('POST /reservation - Create a new reservation', async () => {
    const response = await request(app)
        .post('/reservation')
        .send({
            memberId: 1,
            gymId: 1,
            machines: ['Treadmill', 'Bench Press']
        });
    
    expect(response.status).toBe(201);
    expect(response.body.memberId).toBe(1);
    expect(response.body.gymId).toBe(1);
    expect(response.body.machines).toEqual(['Treadmill', 'Bench Press']);
});

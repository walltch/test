import request from 'supertest';
import app from '../../src/app.js';
import mongoose from 'mongoose';
import Member from '../../src/models/member.js';

describe('Reservation Integration Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const member = new Member({ nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', password: 'password' });
    await member.save();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new reservation', async () => {
    const member = await Member.findOne({ email: 'john.doe@example.com' });

    const response = await request(app)
      .post('/reservations')
      .send({ memberId: member._id, gym: 'Salle A', machine: 'Machine 1' });

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.memberId).toBe(member._id.toString());
    expect(response.body.gym).toBe('Salle A');
    expect(response.body.machine).toBe('Machine 1');
  });
});
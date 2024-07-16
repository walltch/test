import request from 'supertest';
import app from '../../src/app.js';
import mongoose from 'mongoose';

describe('Member Integration Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should register a new member', async () => {
    const response = await request(app)
      .post('/members')
      .send({ nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', password: 'password' });

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.nom).toBe('Doe');
    expect(response.body.prenom).toBe('John');
    expect(response.body.email).toBe('john.doe@example.com');
  });
});
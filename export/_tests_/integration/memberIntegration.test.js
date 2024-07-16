const request = require('supertest');
const app = require('../../src/app');
const Member = require('../../src/models/member');

afterEach(() => {
    Member.members = [];
});

test('POST /register - Register a new member', async () => {
    const response = await request(app)
        .post('/register')
        .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        });
    
    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe('John');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.email).toBe('john.doe@example.com');
});

test('POST /register - Error when registering member with duplicate email', async () => {
    await request(app)
        .post('/register')
        .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        });

    const response = await request(app)
        .post('/register')
        .send({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password456'
        });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Member with this email already exists');
});

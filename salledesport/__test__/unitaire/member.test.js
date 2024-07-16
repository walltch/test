const mongoose = require('mongoose');
const Member = require('../../src/models/member');

describe('Member Model Test', () => {
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

  it('should create a new member', async () => {
    const memberData = { nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', password: 'password' };
    const member = new Member(memberData);
    const savedMember = await member.save();

    expect(savedMember._id).toBeDefined();
    expect(savedMember.nom).toBe(memberData.nom);
    expect(savedMember.prenom).toBe(memberData.prenom);
    expect(savedMember.email).toBe(memberData.email);
    expect(savedMember.password).toBe(memberData.password);
  });
});

const Member = require('../../src/models/member');
const { validateMemberRegistration, registerMember } = require('../../src/controllers/memberController');

test('Validate member registration', () => {
    const validMemberData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
    };
    expect(validateMemberRegistration(validMemberData)).toBe(true);

    const invalidMemberData = {
        firstName: 'Jane',
        lastName: 'Doe'
    };
    expect(validateMemberRegistration(invalidMemberData)).toBe(false);
});

test('Register member', () => {
    const newMember = registerMember('Jane', 'Doe', 'jane.doe@example.com', 'password123');
    expect(newMember.firstName).toBe('Jane');
    expect(newMember.lastName).toBe('Doe');
    expect(newMember.email).toBe('jane.doe@example.com');
    // Add more assertions as needed
});

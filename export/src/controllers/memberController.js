const Member = require('../models/member');

function validateMemberRegistration(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
        return false;
    }
    return true;
}

function registerMember(firstName, lastName, email, password) {
    const existingMember = Member.findMemberByEmail(email);
    if (existingMember) {
        throw new Error('Member with this email already exists');
    }
    return Member.addMember(firstName, lastName, email, password);
}

module.exports = {
    validateMemberRegistration,
    registerMember
};

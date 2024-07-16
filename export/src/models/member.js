let members = [];

function addMember(firstName, lastName, email, password) {
    const newMember = {
        id: members.length + 1,
        firstName,
        lastName,
        email,
        password
    };
    members.push(newMember);
    return newMember;
}

function findMemberByEmail(email) {
    return members.find(member => member.email === email);
}

module.exports = {
    addMember,
    findMemberByEmail
};

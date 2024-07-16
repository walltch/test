const Member = require('../models/member');

exports.register = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};

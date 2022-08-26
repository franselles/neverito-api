'use strict';

const Users = require('../models/modelUsers');

async function postUser(req, res) {
  const user = req.body;

  try {
    const users = new Users(user);
    const data = await users.save();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getUser(req, res) {
  const { _id } = req.body;

  try {
    const data = await Users.findById(_id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function updateUser(req, res) {
  const user = req.body;

  try {
    const data = await Users.findByIdAndUpdate(user._id, user);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function deleteUser(req, res) {
  const { _id } = req.body;

  try {
    const data = await Users.findByIdAndDelete(_id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function postLogin(req, res) {
  const login = req.body;

  try {
    const data = await Users.find({ pin: login.pin });

    res.status(200).send(data[0]);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

module.exports = { postUser, getUser, updateUser, deleteUser, postLogin };

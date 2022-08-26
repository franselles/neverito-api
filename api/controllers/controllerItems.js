'use strict';

const Items = require('../models/modelItems');

async function postItem(req, res) {
  const { name } = req.body;
  const items = new Items({ name });

  try {
    const data = await items.save();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getItem(req, res) {
  const itemId = req.params.id;
  try {
    const data = await Items.findById(itemId).exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getItems(req, res) {
  try {
    const data = await Items.find().sort({ name: 1 }).exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function updateItem(req, res) {
  const dataUpdate = req.body;

  try {
    const data = await Items.findByIdAndUpdate(dataUpdate._id, dataUpdate, {
      new: true,
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function deleteItem(req, res) {
  const itemId = req.params.id;

  try {
    const data = await Items.findByIdAndDelete(itemId);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

module.exports = { postItem, getItem, getItems, updateItem, deleteItem };

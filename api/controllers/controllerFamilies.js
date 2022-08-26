'use strict';

const Families = require('../models/modelFamilies');

async function postFamily (req, res) {
  const { name } = req.body;
  const family = new Families({ name });

  try {
    const data = await family.save();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getFamily (req, res) {
  const { familyId } = req.body;

  try {
    const data = await Families.findById(familyId);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getFamilies (req, res) {
  try {
    const data = await Families.find();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function updateFamily (req, res) {
  const { familyId, name } = req.body;

  try {
    const data = await Families.findOneAndUpdate(familyId, { name }, { new: true });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function deleteFamily (req, res) {
  const familyId = req.params.id;

  try {
    const data = await Families.findByIdAndDelete(familyId);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

module.exports = { postFamily, getFamily, getFamilies, updateFamily, deleteFamily };

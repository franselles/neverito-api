'use stric';

const Orders = require('../models/modelOrders');

async function postOrder(req, res) {
  const order = req.body;
  const orders = new Orders(order);

  try {
    const data = await orders.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrders(req, res) {
  try {
    const data = await Orders.find()
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrdersOpen(req, res) {
  try {
    const data = await Orders.find({ buyed: false })
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrdersDate(req, res) {
  try {
    const data = await Orders.aggregate([
      { $match: { buyed: true } },
      { $group: { _id: '$datePurchase' } },
    ])
      .sort({ _id: -1 })
      .limit(5)
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrdersBuyed(req, res) {
  const datePurchase = req.params.dp;

  try {
    const data = await Orders.find({ datePurchase: datePurchase, buyed: true })
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrder(req, res) {
  const orderId = req.params.id;

  try {
    const data = await Orders.findById(orderId)
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function deleteOrder(req, res) {
  const orderId = req.params.id;

  try {
    const data = await Orders.findByIdAndDelete(orderId);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

function newToday() {
  const todayDate = new Date();
  return todayDate.toISOString().split('T')[0];
}

function putOrders(req, res) {
  const dataReq = req.body;

  try {
    dataReq.forEach(async (element) => {
      if (element.buyed) {
        element.datePurchase = newToday();
      }
      await Orders.findByIdAndUpdate(element._id, element, { new: true });
    });

    // const data = await Orders.updateMany({ }, dataUpdate);

    res.status(200).send({ data: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: 'ko' });
  }
}

module.exports = {
  postOrder,
  getOrders,
  getOrdersDate,
  getOrdersOpen,
  getOrdersBuyed,
  getOrder,
  deleteOrder,
  putOrders,
};

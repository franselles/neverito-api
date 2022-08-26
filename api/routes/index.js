'use strict';

const express = require('express');
const api = express.Router();

const Users = require('../controllers/controllerUsers');
const Families = require('../controllers/controllerFamilies');
const Items = require('../controllers/controllerItems');
const Orders = require('../controllers/controllerOrders');

api.post('/family', Families.postFamily);
api.post('/family/get', Families.getFamily);
api.put('/family/update', Families.updateFamily);
api.get('/families', Families.getFamilies);
api.delete('/family/:id', Families.deleteFamily);

api.post('/user', Users.postUser);
api.post('/login', Users.postLogin);

api.post('/item', Items.postItem);
api.put('/item/update', Items.updateItem);
api.get('/item/:id', Items.getItem);
api.delete('/item/:id', Items.deleteItem);
api.get('/items', Items.getItems);

api.post('/order', Orders.postOrder);
api.get('/orders', Orders.getOrders);
api.get('/orders/open', Orders.getOrdersOpen);
api.get('/orders/date', Orders.getOrdersDate);
api.get('/orders/buyed/:dp', Orders.getOrdersBuyed);
api.get('/order/:id', Orders.getOrder);
api.delete('/order/:id', Orders.deleteOrder);
api.put('/orders', Orders.putOrders);

api.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = api;

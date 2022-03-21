const { Router } = require('express');
const Burger = require('../models/Burger');

module.exports = Router().post('/', async (req, res) => {
  const burger = await Burger.insert(req.body);
  res.json(burger);
});

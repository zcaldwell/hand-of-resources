const { Router } = require('express');
const Fruit = require('../models/Fruit');

module.exports = Router().post('/', async (req, res) => {
  const fruit = await Fruit.insert(req.body);
  res.json(fruit);
});

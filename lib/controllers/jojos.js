const { Router } = require('express');
const Jojo = require('../models/Jojo');

module.exports = Router().post('/', async (req, res) => {
  const jojo = await Jojo.insert(req.body);
  res.json(jojo);
});

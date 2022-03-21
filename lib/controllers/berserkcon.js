const { Router } = require('express');
const Berserk = require('../models/Berserk');

module.exports = Router()
  .post('/', async (req, res) => {
    const berserk = await Berserk.insert(req.body);
    res.json(berserk);
  })

  .get('/', async (req, res) => {
    const berserk = await Berserk.findAll();
    res.send(berserk);
  });
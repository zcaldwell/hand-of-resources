const { Router } = require('express');
const Fruit = require('../models/Fruit');

module.exports = Router()
  .post('/', async (req, res) => {
    const fruit = await Fruit.insert(req.body);
    res.json(fruit);
  })

  .get('/', async (req, res) => {
    const fruit = await Fruit.findAll();
    res.send(fruit);
  })

  .get('/:id', async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);
    res.send(fruit);
  });

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
  })

  .patch('/:id', async (req, res) => {
    const updateFruit = await Fruit.updateById(req.params.id, req.body);
    res.send(updateFruit);
  })

  .delete('/:id', async (req, res) => {
    const fruit = await Fruit.deleteById(req.params.id);
    res.send(fruit);
  });

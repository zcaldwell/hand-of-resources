const { Router } = require('express');
const Burger = require('../models/Burger');

module.exports = Router()
  .post('/', async (req, res) => {
    const burger = await Burger.insert(req.body);
    res.json(burger);
  })

  .get('/', async (req, res) => {
    const burger = await Burger.findAll();
    res.send(burger);
  })

  .get('/:id', async (req, res) => {
    const burger = await Burger.findById(req.params.id);
    res.send(burger);
  });

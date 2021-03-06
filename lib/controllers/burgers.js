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
  })

  .patch('/:id', async (req, res) => {
    const updateBurger = await Burger.updateById(req.params.id, req.body);
    res.send(updateBurger);
  })

  .delete('/:id', async (req, res) => {
    const burger = await Burger.deleteById(req.params.id);
    res.send(burger);
  });

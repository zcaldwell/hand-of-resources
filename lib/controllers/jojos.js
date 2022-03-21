const { Router } = require('express');
const Jojo = require('../models/Jojo');

module.exports = Router()
  .post('/', async (req, res) => {
    const jojo = await Jojo.insert(req.body);
    res.json(jojo);
  })

  .get('/', async (req, res) => {
    const jojo = await Jojo.findAll();
    res.send(jojo);
  })

  .get('/:id', async (req, res) => {
    const jojo = await Jojo.findById(req.params.id);
    res.send(jojo);
  })

  .patch('/:id', async (req, res) => {
    const updateJojo = await Jojo.updateById(req.params.id, req.body);
    res.send(updateJojo);
  })

  .delete('/:id', async (req, res) => {
    const jojo = await Jojo.deleteById(req.params.id);
    res.send(jojo);
  });

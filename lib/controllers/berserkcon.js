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
  })

  .get('/:id', async (req, res) => {
    const berserk = await Berserk.findById(req.params.id);
    res.send(berserk);
  })

  .patch('/:id', async (req, res) => {
    const updateArc = await Berserk.updateById(req.params.id, req.body);
    res.send(updateArc);
  });

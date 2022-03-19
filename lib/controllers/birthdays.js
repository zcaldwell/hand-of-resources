const { Router } = require('express');
const Birthday = require('../models/Birthday');

module.exports = Router()
  .post('/', async (req, res) => {
    const birthday = await Birthday.insert(req.body);
    res.json(birthday);
  })

  .get('/', async (req, res) => {
    const birthday = await Birthday.findAll();
    res.send(birthday);
  })

  .get('/:id', async (req, res) => {
    const birthday = await Birthday.findById(req.params.id);
    res.send(birthday);
  });

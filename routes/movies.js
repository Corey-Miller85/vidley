const express = require('express');
const router = express.Router();
const {Movies} = require('../models/movie');

router.get('/', async (req, res) => {
  const movies = await Movies.find().lean();
  res.send(movies)
})

module.exports = router;
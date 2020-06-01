const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre')
const {Movie, validateMovie} = require('../models/movie');

router.get('/', async (req, res) => {
  const results = await Movie.find();
  res.send(results);
})

router.post('/', async (req, res) => {
  const {error, value} = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreId = await Genre.findById(value.genre)
  let movie = await Movie.create({
    title: value.title,
    genre: {
      _id: genreId._id,
      name: genreId.name,
    },
    numberInStock: value.numberInStock,
    dailyRentalRate: value.dailyRentalRate
  })
  movie.save();
  res.send(movie)
})

module.exports = router;
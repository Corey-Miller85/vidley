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

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) res.status(404).send(`No Movie found for the id: ${req.params.id}`)
  res.send(movie)
})

router.put('/:id', async (req, res) => {
  const {error, value} = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  },{new: true})
  const result = await movie.save();
  res.send(result);
})

router.delete('/:id', async (req, res) => { 
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
})
module.exports = router;
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')


const Genre = mongoose.model('Genre',mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    lowercase: true,
  }
}));

router.get('/', async (req, res) => {
  const results = await Genre.find().sort('name')
  res.json(results)
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let genre =  new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
  } catch(err) {
    console.log("There was an error", err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
      },
    {
      new: true
    });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const result = await genre.save()
    res.send(result);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  } catch(err) {
    console.log("Error!",err)
  }
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router, validateGenre;
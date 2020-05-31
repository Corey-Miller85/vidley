const mongoose = require('mongoose');
const {Genre} = require('./genre')

const Movies = mongoose.model('Movie', mongoose.Schema({
  title: {
    type: String
  },
  genre: {
   type: Genre
  },
  numberInStock: {
    type: Number
  },
  dailyRentalRate: {
    type: Number
  }
})) 

async function createMovie(movie, genreId) {
  const genre = await Genre.findById(genreId)
  console.log(genre)
}

createMovie('5ed325994aea7417eafc720d')
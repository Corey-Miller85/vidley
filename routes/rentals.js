
const express = require('express');
const {Movie} = require('../models/movie')
const {Customer} = require('../models/customer')
const router = express.Router();
const {Rental} = require('../models/rental')

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals)
})

router.post('/', async(req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);
  if (!customer) res.status(404).send(`No matching Customer for id #{req.body.customerId}`)
  if (!customer) res.status(404).send(`No matching Movie for id #{req.body.movieId}`)
  if (movie.numberInStock === 0) res.status(400).send(`Movie no longer in stock.`)
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  })
  movie.numberInStock--;
  const checkout = await rental.save()
  movie.save();
  res.json(checkout)
})

router.get('/:id', async (req, res) => {
  const rentalRecord = await Rental.findById(req.params.id);
  if (!rentalRecord) res.status(404).send(`There is not matching rental record for rental id: ${req.params.id}`)
  
  res.send(rentalRecord);
})

module.exports = router;
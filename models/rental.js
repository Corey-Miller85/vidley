const mongoose = require("mongoose");
const { Genre, genreSchema } = require("./genre");
const Joi = require('joi')

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      isGold: {
        type: Boolean,
        required: true,
      },
      phone:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      }
    })
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      dateOut: {
        type: Date,
        required: true,
        default: Date.now
      },
      dateReturned: {
        type: Date
      },
      rentalFee: {
        type: Number,
        min: 0
      }
    })
  }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
	const schema = {
  customerID: Joi.string().min(3).max(255).required(),
  movieId: Joi.string().min(3).max(255).required()
	};

	return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validateMovie = validateRental;

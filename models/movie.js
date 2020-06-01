const mongoose = require("mongoose");
const { Genre, genreSchema } = require("./genre");
const Joi = require('joi')

const movieSchema = mongoose.Schema({
	title: {
		type: String,
	},
	genre: {
		type: genreSchema,
		required: true,
	},
	numberInStock: {
		type: Number,
		default: 1,
	},
	dailyRentalRate: {
		type: Number,
		default: 0,
	},
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(genre) {
	const schema = {
		title: Joi.string().min(3).required(),
		genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required()
	};

	return Joi.validate(genre, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;

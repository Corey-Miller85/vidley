const mongoose = require("mongoose");
const Joi = require("joi");


const Customer = mongoose.model(
	"Customer",
	mongoose.Schema({
		isGold: {
			required: true,
      type: Boolean,
      default: false
		},
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			lowercase: true,
		},
		phone: {
			required: true,
			type: Number,
			minlength: 10,
			maxlength: 10,
		},
	})
);

const validateCustomer = (customer) => {
	const schema = Joi.object().keys({
		isGold: Joi.boolean().required(),
		name: Joi.string().min(3).max(255).required(),
		phone: Joi.number().required(),
	});
	return Joi.validate(customer, schema);
};

module.exports.Customer = Customer;
exports.validate = validateCustomer;
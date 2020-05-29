const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
	"Customer",
	mongoose.Schema({
		isGold: {
			required: true,
			type: Boolean,
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

router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	res.send(customers);
});

router.post("/", async (req, res) => {
	try {
		const { error, value } = validateCustomer(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		const customer = await Customer.create({
			isGold: value.isGold,
			name: value.name,
			phone: value.phone,
		});
		const result = await customer.save();
		res.send(result);
	} catch (err) {
    res.status(400).send("There was an error...", err);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { error, value } = validateCustomer(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		const customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{
				isGold: value.isGold,
				name: value.name,
				phone: value.phone,
			},
			{ new: true }
    );
    res.send(customer)
	} catch (err) {
    res.status(400).send("There was an error...", err);
	}
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer)
  } catch(err) {
    res.status(400).send("There was an error...", err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
  } catch(err) {
    res.status(400).send("There was an error...", err);
  }
})

const validateCustomer = (customer) => {
	const schema = Joi.object().keys({
		isGold: Joi.boolean().required(),
		name: Joi.string().min(3).max(255).required(),
		phone: Joi.number().required(),
	});
	return Joi.validate(customer, schema);
};

module.exports = router;

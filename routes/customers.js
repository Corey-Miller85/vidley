const express = require("express");
const router = express.Router();
const {Customer, validate} = require('../models/customer')

router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	res.send(customers);
});

router.post("/", async (req, res) => {
	try {
		const { error, value } = validate(req.body);
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
		const { error, value } = validate(req.body);
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
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
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

module.exports = router;

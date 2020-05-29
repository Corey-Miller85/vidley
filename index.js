const mongoose = require('mongoose');
const express = require('express');
const app = express();
const helmet = require('helmet')
const genres = require('./routes/genres')
const customers = require('./routes/customers')


mongoose.connect('mongodb://localhost/vidley', { useNewUrlParser: true })
  .then(console.log('Connected to Vidley Database...'))
  .catch(err => console.log("Couldn't connect to MongoDB...", err))


app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/genres', genres);
app.use('/api/customers', customers);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
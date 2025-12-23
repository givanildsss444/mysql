const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/users', usersRoutes);
app.use('/users', ordersRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/auth', authRoutes)

module.exports = app;
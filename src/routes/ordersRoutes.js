const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

router.get('/test', (req, res) => {
  res.send('funcionando✅✅✅✅');
});

router.get('/:id/orders', controller.listForUser);

module.exports = router;
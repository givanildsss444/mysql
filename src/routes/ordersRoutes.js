const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

router.get('/test', (req, res) => {
  res.send('funcionando✅✅✅✅');
});

router.post('/orders', controller.createForUsers)
router.get('/:id/orders', controller.listForUser);
router.delete('/orders/:id', controller.deleteForUser);

module.exports = router;
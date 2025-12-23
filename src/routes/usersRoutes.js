const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController')

//router.get('/', controller.list)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

router.get('/', (req, res) => {
    res.json({msg: 'users route ok'})
})

module.exports = router
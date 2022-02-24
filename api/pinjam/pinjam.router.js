const router = require('express').Router()
const {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete
} = require('./pinjam.controller')

router.post('/', controllerAdd)
router.get('/', controllerGet)
router.get('/id', controllerGetId)
router.patch('/', controllerUpdate)
router.delete('/', controllerDelete)

module.exports = router 
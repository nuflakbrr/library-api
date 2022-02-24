const router = require('express').Router()
const { checkToken } = require('../../auth/tokenValidation')
const {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete
} = require('./anggota.controller')

router.post('/', checkToken, controllerAdd)
router.get('/', checkToken, controllerGet)
router.get('/id', checkToken, controllerGetId)
router.patch('/', checkToken, controllerUpdate)
router.delete('/', checkToken, controllerDelete)

module.exports = router
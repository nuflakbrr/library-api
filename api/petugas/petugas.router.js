const router = require('express').Router()
const { checkToken } = require("../../auth/tokenValidation")
const {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete,
    controllerLogin
} = require('./petugas.controller')

router.post('/', controllerAdd)
router.get('/', checkToken, controllerGet)
router.get('/id', checkToken, controllerGetId)
router.patch('/', checkToken, controllerUpdate)
router.delete('/', checkToken, controllerDelete)
router.post('/login', controllerLogin)

module.exports = router

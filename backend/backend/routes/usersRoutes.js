const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

const { createUser, loginUser, datosUser } = require('../controllers/usersControllers')

//endpoints publicos
router.post('/', createUser)
router.post('/login', loginUser)
router.post('/register', createUser)

//endpoint privado
router.get('/datos', protect, datosUser)

module.exports = router
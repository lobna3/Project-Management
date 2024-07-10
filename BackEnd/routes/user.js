const express = require('express')
const router = express.Router()

const {getAllUsers,adduser}= require('../controllers/users.js')
const {Register,Login}= require('../controllers/authUser.js')

router.get('/getAll',getAllUsers)
router.post('/add',adduser)
router.post('/register',Register)
router.post('/login',Login)

module.exports = router
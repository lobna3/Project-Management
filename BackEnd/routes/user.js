const express = require('express')
const router = express.Router()

const {getAllUsers,adduser}= require('../controllers/users.js')


router.get('/getAll',getAllUsers)
router.post('/add',adduser)

module.exports = router
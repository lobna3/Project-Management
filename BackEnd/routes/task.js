const express = require('express')
const router = express.Router()

const {getAllTasks,addTask,getAllProjkets,getOneProjekt} = require('../controllers/tasks')

router.get('/getAll',getAllTasks)
router.post('/add',addTask)
router.get('/getProjekts',getAllProjkets)
router.get('/getProjekts/:id',getOneProjekt)

module.exports = router
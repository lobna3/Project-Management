const express = require('express')
const router = express.Router()

const {getAllTasks,addTask,getAllProjkets,getOneProjekt,deleteTask} = require('../controllers/tasks')

router.get('/getAll',getAllTasks)
router.post('/add',addTask)
router.get('/getProjekts',getAllProjkets)
router.get('/getProjekts/:id',getOneProjekt)
router.delete('/:id',deleteTask)

module.exports = router
const express = require('express')
const router = express.Router()

const {getAllProjkets,addProjekt,getOneProjekt,deleteProjekt,
    updateProjekt,findByTitle} = require ('../controllers/projekts')

router.get('/getAll',getAllProjkets)
router.post('/add',addProjekt)
router.get('/getAll/:id',getOneProjekt)
router.delete('/:id',deleteProjekt)
router.put('/:id',updateProjekt)
router.get('/title/:title',findByTitle)


module.exports = router
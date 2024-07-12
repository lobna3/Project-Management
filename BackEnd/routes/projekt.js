const express = require('express')
const router = express.Router()

const { cloudinary } = require('../utils/cloudinary.js');
const upload = require('../middleware/multer.js')


const {getAllProjkets,addProjekt,getOneProjekt,deleteProjekt,
    updateProjekt,findByTitle,addProjektUpload} = require ('../controllers/projekts')

router.get('/getAll',getAllProjkets)
router.post('/add',addProjekt)
router.get('/getAll/:id',getOneProjekt)
router.delete('/:id',deleteProjekt)
router.put('/:id',updateProjekt)
router.get('/title/:title',findByTitle)

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res.secure_url
}

router.post("/upload", upload.single("my_file"), async (req, res) => {

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64")
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64
        //const cldRes = await handleUpload(dataURI)
        const imageUrl = await handleUpload(dataURI)
        const newProjekt = await addProjektUpload(req, res, imageUrl);
        res.json(newProjekt);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        })
    }
})

module.exports = router
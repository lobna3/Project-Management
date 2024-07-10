const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 5000

const bodyParser = require('body-parser');
const usersRoutes = require ('./routes/user.js')

const db = require('./orm/index.js')
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello new Projekt Managments")
})

app.use('/api/users',usersRoutes)

app.listen(  port, () => {
    console.log(`server listenning on port ${port}`)
})
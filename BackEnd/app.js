const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 5000

const db = require('./orm/index.js')

app.get("/", (req, res) => {
    res.send("Hello new Projekt Managments")
})


app.listen(  port, () => {
    console.log(`server listenning on port ${port}`)
})
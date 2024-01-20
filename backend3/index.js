const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqlite3 = require('sqlite3')
const { studentsSQLiteAPI } = require("./students")
const db = new sqlite3.Database('./sample.db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(4000, () => {
    //console.log("Server is running on port 4000");
})
app.get('/', (req, res) => {
    return res.json("hai")
})

app.post('/', (req, res) => {
    return res.json("hello")
})
app.get('/test2', (req, res) => {
    const { name, age } = req.query
    return res.json({ name, age })
})

app.get('/test3', (req, res) => {
    const { name, age } = req.body
    return res.json({ name, age })
})
app.get('/student/:name', (req, res) => {
    const { name } = req.params
    return res.json({ name })
})

app.get('/product/:category/:item', (req, res) => {
    const { category, item } = req.params
    return res.json({ category, item })
})
// creating a table
studentsSQLiteAPI(app, db)
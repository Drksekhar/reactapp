const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqlite3 = require('sqlite3')
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
db.run(`
  CREATE TABLE IF NOT EXISTS students (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [name] TEXT,
    [phone] TEXT
    )
  `);
// selecting all the students form a table
app.get('/students', (req, res) => {
    const sql = "select * from  students"
    db.all(sql, (error, result) => {
        if (error) return res.status(500).json(error.message)
        res.status(200).json(result)
    })
})
// adding or insering students into the talbe
app.post('/students', (req, res) => {
    const { name, phone } = req.body
    const sql = "INSERT INTO students (name,phone) VALUES (?,?)"
    db.run(sql, [name, phone], (error) => {
        if (error) return res.status(500).json(error.message)
        return res.status(200).json("student added")
    })
})
// deleting a particular student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM students where id=?"
    db.run(sql, [id], (error) => {
        if (error) return res.status(500).json(error.message)
        return res.status(200).json("student deleted")
    })
})
// Deleting all the students
app.delete('/students', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM students"
    db.run(sql, (error) => {
        if (error) return res.status(500).json(error.message)
        return res.status(200).json("All students are deleted")
    })
})
// updating or editing data in the table
app.post('/students/:id', (req, res) => {
    const { id } = req.params
    const { name, phone } = req.body
    const sql = "UPDATE  students set name=?, phone=? where id=?"
    db.run(sql, [name, phone, id], (error) => {
        if (error) return res.status(500).json(error.message)
        return res.status(200).json("student updated")
    })
})
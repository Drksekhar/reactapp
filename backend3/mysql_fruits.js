const mysql = require("mysql")
const mydb = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
})
function Mysql_Fruits(app) {
    mydb.getConnection(function (err, connection) {
        if (err) {
            console.err("Error Connectiong to databse", err)
            return
        }
    })
    // Creating a table name called Fruits
    mydb.query(`CREATE TABLE IF NOT EXISTS fruits (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name TEXT,
    price TEXT
    )`, (error, result) => {
        if (error) console.error(error);
    })
    // adding fruits detail to database
    app.post('/api/fruits', (req, res) => {
        const { name, price } = req.body
        const sql = "INSERT INTO fruits (name, price) VALUES (?,?)"
        mydb.query(sql, [name, price], (error, result) => {
            if (error) return res.json(error.message)
            return res.json('Fruit added')
        })
    })
    //  Selecting all the furits details
    app.get('/api/fruits', (req, res) => {
        const sql = "SELECT * FROM fruits"
        mydb.query(sql, (error, result) => {
            if (error) return res.json(error.message)
            return res.json(result)
        })
    })

    //  Selecting only one furit details
    app.get('/api/fruits/:id', (req, res) => {
        const { id } = req.params
        const sql = `SELECT * FROM fruits WHERE id=?`
        mydb.query(sql, [id], (error, result) => {
            if (error) return res.json(error.message)
            return res.json(result)
        })
    })

    //  Deleting one furit
    app.delete('/api/fruits/:id', (req, res) => {
        const { id } = req.params
        const sql = `DELETE FROM fruits WHERE id=?`
        mydb.query(sql, [id], (error, result) => {
            if (error) return res.json(error.message)
            return res.json(result)
        })
    })

    //  Deleting all furits details
    app.delete('/api/fruits', (req, res) => {
        const sql = `DELETE FROM fruits `
        mydb.query(sql, (error, result) => {
            if (error) return res.json(error.message)
            return res.json(result)
        })
    })

    // Updating fruits detail to database
    app.post('/api/fruits/:id', (req, res) => {
        const { id } = req.params
        const { name, price } = req.body
        const sql = "UPDATE fruits set name=?, price=? WHERE id=?"
        mydb.query(sql, [name, price, id], (error, result) => {
            if (error) return res.json(error.message)
            return res.json('Fruit Updated')
        })
    })

}
module.exports = { Mysql_Fruits }
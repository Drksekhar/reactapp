const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqlite3 = require('sqlite3')
const { studentsSQLiteAPI } = require("./students")
const { booksSQLite } = require("./books")
const { dummyAPIs } = require("./dummyapis")
const db = new sqlite3.Database('./sample.db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(4000, () => {
    //console.log("Server is running on port 4000");
})

studentsSQLiteAPI(app, db)
booksSQLite(app, db)
dummyAPIs(app, db)
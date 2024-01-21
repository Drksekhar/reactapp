const jwt = require("jsonwebtoken")
function studentsSQLiteAPI(app, db) {
    db.run(`
  CREATE TABLE IF NOT EXISTS students (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [name] TEXT,
    [phone] TEXT
    )
  `);
    // Getting or selecting all the students form a table
    app.get('/students', (req, res) => {
        const sql = "select * from  students"
        db.all(sql, (error, result) => {
            if (error) return res.status(500).json(error.message)
            res.status(200).json(result)
        })
    })

    // Getting  or selecting one student by ID

    app.get('/students/:id', (req, res) => {
        const { id } = req.params
        const sql = "SELECT * FROM students where id=?"
        db.get(sql, [id], (error, result) => {
            if (error) return res.status(500).json(error.message)
            res.status(200).json(result)
        })
    })
    // adding or insering students into the talbe
    app.post('/students', (req, res) => {
        if (!verifyToken(req, res)) return
        const { name, phone } = req.body
        const sql = "INSERT INTO students (name, phone) VALUES (?,?)"
        db.run(sql, [name, phone], (error) => {
            if (error) return res.status(500).json(error.message)
            return res.status(200).json("inserted into table")
        })
    })
    // deleting a particular student
    /*app.delete('/students/:id', (req, res) => {
        const { id } = req.params
        const sql = "DELETE FROM students where id=?"
        db.run(sql, [id], (error) => {
            if (error) return res.status(500).json(error.message)
            return res.status(200).json("student deleted")
        })
    })*/

    app.delete('/students/:id', (req, res) => {
        if (!verifyToken(req, res)) return
        const { id } = req.params
        const sql = "DELETE FROM students where id=?"
        db.run(sql, [id], (error) => {
            if (error) return res.status(500).json(error.message)
            return res.status(200).json("Deleted one student")
        })
    })

    // Deleting all the students
    app.delete('/students', (req, res) => {
        if (!verifyToken(req, res)) return
        const { id } = req.params
        const sql = "DELETE FROM students"
        db.run(sql, (error) => {
            if (error) return res.status(500).json(error.message)
            return res.status(200).json("All students are deleted")
        })
    })
    // updating or editing data in the table
    /*app.post('/students/:id', (req, res) => {
        const { id } = req.params
        const { name, phone } = req.body
        const sql = "UPDATE  students set name=?, phone=? where id=?"
        db.run(sql, [name, phone, id], (error) => {
            if (error) return res.status(500).json(error.message)
            return res.status(200).json("student updated")
        })
    })*/
    app.post('/students/:id', (req, res) => {
        if (!verifyToken(req, res)) return
        const { id } = req.params
        const { name, phone } = req.body
        const sql = "UPDATE students set name=?, phone=? where id=?"
        db.run(sql, [name, phone, id], (error) => {
            if (error) return res.status(500).json(error.message)
            return res.status(200).json(" Student updated Successfully ")
        })

    })
    // Token verification 
    function verifyToken(req, res) {
        const token = req?.headers?.authorization?.split(" ")[1];
        try {
            return jwt.verify(token, "RANDOM-TOKEN");
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ error: "Token has expired" });
            } else {
                res.status(500).json({ error: "Token verification failed" });
            }
            return false
        }
    }

}
module.exports = { studentsSQLiteAPI }
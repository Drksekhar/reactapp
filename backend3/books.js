function booksSQLite(app, db) {
    //creating a table called "books"
    db.run(`
  CREATE TABLE IF NOT EXISTS books (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [name] TEXT,
    [price] TEXT
    )
  `);
    // Selecting All
    app.get('/api/books', (req, res) => {
        const sql = "SELECT * FROM books"
        db.all(sql, (error, result) => {
            if (error) return res.json(error.message)
            return res.json(result)
        })
    })
    // Selecting by id
    app.get('/api/books/:id', (req, res) => {
        const { id } = req.params
        const sql = " SELECT * FROM books WHERE id=?"
        db.get(sql, [id], (error, result) => {
            if (error) return res.json(error.message)
            return res.json(result)
        })
    })
    // Adding / inserting book into database
    app.post('/api/books', (req, res) => {
        const { name, price } = req.body
        const sql = "INSERT INTO books (name, price) VALUES (?,?)"
        db.run(sql, [name, price], (error) => {
            if (error) return res.json(error.message)
            return res.json(name + " New book added into database")
        })
    })
    // updating by id 
    app.post('/api/books/:id', (req, res) => {
        const { id } = req.params
        const { name, price } = req.body
        const sql = " UPDATE books  set name=?, price=? WHERE id=?"
        db.run(sql, [name, price, id], (error, result) => {
            if (error) return res.json(error.message)
            return res.json("name +  updated")
        })
    })
    // Delete all
    app.delete('/api/books', (req, res) => {
        const sql = "DELETE FROM books"
        db.run(sql, (error) => {
            if (error) return res.json(error.message)
            return res.json("all books deleted")
        })
    })
    // Delete only one
    app.delete('/api/books/:id', (req, res) => {
        const { id } = req.params
        const sql = "DELETE FROM books WHERE id=?"
        db.run(sql, [id], (error) => {
            if (error) return res.json(error.message)
            return res.json(" id +  books deleted")
        })
    })
}

module.exports = { booksSQLite }
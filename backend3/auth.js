const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

function AuthenticationAPIs(app, db) {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            [username] TEXT,
            [password] TEXT
        )`);

    app.post('/aut/register', (req, res) => {
        const { username, password } = req.body
        const checkuserSQL = "SELECT id FROM users WHERE username=?"


        // check if the user already exists
        db.get(checkuserSQL, [username], (error, result) => {
            if (error) { return res.json(error.messageg) }
            if (result) { return res.json("user allready exists") }
            // user does not exist , insert into database
            const insertuserSQL = "INSERT INTO users (username, password) values (?,?)"
            bcrypt
                .genSalt(saltRounds)
                .then(salt => {
                    return bcrypt.hash(password, salt)
                })
                .then(hash => {
                    db.run(insertuserSQL, [username, hash], (error) => {
                        if (error) return res.json(error.messageg)
                        return res.json("User Created")
                    })
                })
        })
    })
    // login with token 
    app.post("/aut/login", (req, res) => {
        const { username, password } = req.body
        const sql = `SELECT * FROM users WHERE username=?`
        db.get(sql, [username], (error, result) => {
            if (error) return res.status(500).json(error)
            if (!result) return res.status(404).json('User not found')
            bcrypt.compare(password, result.password)
                .then((matched) => {
                    if (!matched) return res.status(500).json('Wrong password')
                    const token = jwt.sign(
                        { userId: username, },
                        "RANDOM-TOKEN",
                        { expiresIn: "30d" }
                    )
                    res.status(200).json({ username, token });
                })
                .catch(err => res.status(500).json(err.message))
        })
    })


    // Selecting All
    app.get('/aut/users', (req, res) => {
        const seluser = "SELECT * FROM users"
        db.all(seluser, (error, result) => {
            if (error) return res.json(error.messageg)
            return res.json(result)
        })
    })



}

module.exports = { AuthenticationAPIs };

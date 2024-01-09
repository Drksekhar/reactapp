const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(4000, () => {
  // console.log("Server is running on port 4000");
})
app.get('/', (req, res) => {
  return res.send('hai')
})

app.get('/test1', (req, res) => {
  return res.json({
    name: 'jhon',
    age: 25
  })
})

app.get('/test2', (req, res) => {
  const { fname, lname } = req.query
  return res.json({ fname, lname })
})

app.post('/test3', (req, res) => {
  const { add, ph } = req.body
  return res.json({ add, ph })
})

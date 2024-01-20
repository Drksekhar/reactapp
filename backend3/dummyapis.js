function dummyAPIs(app, db) {
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

}
module.exports = { dummyAPIs }
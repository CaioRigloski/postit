const express = require('express')
const bodyParser = require('body-parser');
const { insertPost } = require('./src/controllers/queries');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.route('/postit')
    .post( (req, res) => {
        insertPost(req.body.description, req.body.title)
    })

app.listen(port, console.log(`Servidor iniciado na porta ${port}`))

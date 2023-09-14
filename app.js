const express = require('express')
const bodyParser = require('body-parser');
const { insertPost, deletePost, readPosts, updatePost } = require('./src/controllers/queries');

const app = express()
const port = 3000
app.listen(port, console.log(`Servidor iniciado na porta ${port}`))

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
    .get((req, res) => {
        readPosts().then(data => {
            res.status(200).json(data[0])
        }).catch((err) => {
            res.status(400).json({'response': 'Erro. Não foi possível consultar os dados.'})
        })
    })
    
    .post((req, res) => {
        insertPost(req.body.description, req.body.title).then((data) => {
            // return ID of SQL insert to append the postit dynamically.
            res.status(200).json({'response': 'Dados gravados com sucesso!', 'id': data[0].insertId})
        }).catch((err) => {
            res.status(400).json({'response': 'Erro. Não foi possível gravar os dados.'})
        })
    })

    .put((req, res) => {
        updatePost(req.body.description, req.body.title, req.body.id).then((data) => {
            res.status(200).json({'response': 'Dados alterados com sucesso!'})
        }).catch((err) => {
            res.status(400).json({'response': 'Erro. Não foi possível alterar os dados.'})
        })
    })

    .delete((req, res) => {
        deletePost(req.body.id).then(data => {
            res.status(200).json({'response': 'Dados excluídos com sucesso!'})
        }).catch((err) => {
            res.status(400).json({'response': 'Erro. Não foi possível excluir os dados.'})
        })
    })
// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// conectar na porta do heroku
const port = process.env.PORT || 3000

app.use(express.json())

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers","*");
    app.use(cors());
    next();
})

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)



// rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const leadRoutes = require('./routes/leadRoutes')
app.use('/lead', leadRoutes)

/* rota inicial / endpoint
    app.get('/', (req, res) => {
    // mostrar req
    res.json({ message: 'Oi express!' })
}) 
*/

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hgyhv.mongodb.net/freedevsapi?retryWrites=true&w=majority`)
.then( () => {
    console.log('conectamos ao mongoDB')
    app.listen(port)
})
.catch((err) => console.log(err))

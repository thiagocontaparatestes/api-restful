const express = require('express')
const cors = require('cors')

const db = require('./database/db')
const routes = require('./routes/routes')

const app = express()

// conexão com o banco de dados
db.connect()

// habilita CORS
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://www.app.com.br',
]

app.use(cors({
  origin: function(origin, callback) {
    // permite requests sem 'origin' - exemplo: mobile apps
    if (!origin) return callback(null, true)

    // verifica se o 'origin' está na lista de permitidos
    if (!allowedOrigins.includes(origin)) return callback(null, false)

    // autoriza request
    return callback(null, true)
  }
}))

// habilita server para receber dados json
app.use(express.json())

// definindo as rotas
app.use('/api', routes)

// executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))
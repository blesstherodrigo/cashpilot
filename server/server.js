import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: true
}))
server.use(cors())

const PORT = process.env.PORT || 3000

server.get('/', (req, res) => {
    res.send('raiz " / " acessada')
})

server.listen(PORT, () => {
    console.log('Server rodando na ports: ' + PORT);
})

export { server, PORT }
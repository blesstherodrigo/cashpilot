import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import path from 'path'
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'
import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb'
import { nanoid } from 'nanoid'
import { OpenAI } from 'openai'

// Configurar express
const port = 3001
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

const SECRET = 'chave_secreta'


// Procurar arquivo do Lowdb
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Configurar lowdb
const file = path.join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter, { usuarios: {}, gastos: {} })

await db.read()
db.data ||= { usuarios: {}, gastos: {} }
await db.write()



// Configurar OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const mensagens = [
  { role: "system", content: "Você é um assistente útil e direto." },
]

async function obterResposta(pergunta) {
  mensagens.push({ role: "user", content: pergunta })

  try {
    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: mensagens,
    })

    const respostaTexto = resposta.choices[0].message.content
    mensagens.push({ role: "assistant", content: respostaTexto })
    return respostaTexto
  } catch (err) {
    console.error("Erro ao chamar a API:", err)
    return "Houve um erro ao processar sua pergunta."
  }
}

// Rota para interagir com o ChatGPT
app.post('/perguntar', async (req, res) => {
  const { pergunta } = req.body
  const resposta = await obterResposta(pergunta)
  res.json({ resposta })
})




// Middleware de autenticação
function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ erro: 'Token não fornecido' })

    jwt.verify(token, SECRET, (err, payload) => {
        if (err) return res.status(403).json({ erro: 'Token inválido' })
        req.usuarioId = payload.id
        next()
    })
}


/* Usuário */

// login
app.post('/login', async (req, res) => {
    await db.read()
    const { email, senha } = req.body

    const usuario = Object.values(db.data.usuarios).find(u => u.email === email)
    if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
    }

    const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '1h' })
    res.status(201).json({ mensagem: 'Token fornecido com sucesso!', token: token })
})

// cadastro
app.post('/cadastro', async (req, res) => {
    await db.read()
    const { nome, nascimento, email, senha } = req.body

    if (!nome || !nascimento || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, nascimento, email e senha são obrigatórios' })
    }

    const usuarioExistente = Object.values(db.data.usuarios).find(u => u.email === email)
    if (usuarioExistente) {
        return res.status(409).json({ erro: 'Email já está em uso' })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = {
        id: nanoid(),
        nome,
        nascimento,
        email,
        senha: senhaHash
    };

    db.data.usuarios[novoUsuario.id] = novoUsuario
    await db.write()

    const token = jwt.sign({ id: novoUsuario.id }, SECRET, { expiresIn: '1h' })

    res.status(201).json({ mensagem: `Usuário ${ novoUsuario.nome }, cadastrado com sucesso!`, mensagem: 'Token fornecido com sucesso!', token: token })
})

// obter perfil do usuário
app.get('/perfil', autenticarToken, async (req, res) => {
    await db.read()

    const usuario = db.data.usuarios[req.usuarioId]
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    const { nome, email, nascimento } = usuario
    res.status(200).json({ nome, email, nascimento })
})


// atualizar perfil do usuário
app.put('/perfil', autenticarToken, async (req, res) => {
    await db.read()

    const { nome, email } = req.body

    const usuario = db.data.usuarios[req.usuarioId]
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    if (email) {
        const emailJaUsado = Object.values(db.data.usuarios).find(
            u => u.email === email && u.id !== usuario.id
        )
        if (emailJaUsado) {
            return res.status(409).json({ erro: 'Email já está em uso por outro usuário' })
        }
        usuario.email = email
    }

    if (nome) usuario.nome = nome

    await db.write()

    res.status(200).json({ nome: usuario.nome, email: usuario.email })
})



/* Gastos */

// listar gastos
app.get('/gastos', autenticarToken, async (req, res) => {
    await db.read()
    const meusGastos = Object.values(db.data.gastos).filter(
        g => g.usuarioId === req.usuarioId
    )

    res.status(201).json({ mensagem: 'Gastos listados com sucesso', gastos: meusGastos })
})

// adicionar gasto
app.post('/gastos', autenticarToken, async (req, res) => {
    const { titulo, tipo, data, valor, descricao } = req.body

    if (!titulo || !tipo || !data || typeof valor !== 'number') {
        return res.status(400).json({ erro: 'Título, tipo, data e valor são obrigatórios' })
    }

    await db.read()
    const novoGasto = {
        id: nanoid(),
        usuarioId: req.usuarioId,
        titulo,
        tipo,
        data,
        valor,
        descricao: descricao || ''
    }

    db.data.gastos[novoGasto.id] = novoGasto
    await db.write()

    res.status(201).json( { mensagem: `Gasto de R$${ novoGasto.valor }, adicionado com sucesso!` })
})

// editar gasto
app.put('/gastos/:id', autenticarToken, async (req, res) => {
    const { id } = req.params
    const { titulo, tipo, data, valor, descricao } = req.body

    await db.read()
    const gasto = db.data.gastos[id]
    if (!gasto || gasto.usuarioId !== req.usuarioId) {
        return res.status(404).json({ erro: 'Gasto não encontrado' })
    }

    if (titulo) gasto.titulo = titulo
    if (tipo) gasto.tipo = tipo
    if (data) gasto.data = data
    if (typeof valor === 'number') gasto.valor = valor
    if (descricao !== undefined) gasto.descricao = descricao

    await db.write()
    res.status(201).json({ mensagem: `Gasto de R$${ gasto.valor }, atualizado com sucesso!` })
})

// deletar gasto
app.delete('/gastos/:id', autenticarToken, async (req, res) => {
    const { id } = req.params

    await db.read()

    const gasto = db.data.gastos[id]
    if (!gasto || gasto.usuarioId !== req.usuarioId) {
        return res.status(404).json({ erro: 'Gasto não encontrado' })
    }
    delete db.data.gastos[id]

    await db.write()
    res.status(201).json({ mensagem: 'Gasto deletado com sucesso' })
})





// gastos por tipo
app.get('/gastos/por-tipo', autenticarToken, async (req, res) => {
    await db.read()
    const meusGastos = Object.values(db.data.gastos).filter(g => g.usuarioId === req.usuarioId)

    const gastosPorTipo = meusGastos.reduce((acc, gasto) => {
        acc[gasto.tipo] = (acc[gasto.tipo] || 0) + gasto.valor
        return acc
    }, {})

    const resultado = Object.entries(gastosPorTipo).map(([tipo, total]) => ({ tipo, total }))
    res.status(200).json({ gastosPorTipo: resultado })
})


// gastos por mês (ordenado)
app.get('/gastos/por-mes', autenticarToken, async (req, res) => {
    await db.read()
    const meusGastos = Object.values(db.data.gastos).filter(g => g.usuarioId === req.usuarioId)

    const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const gastosPorMes = meusGastos.reduce((acc, gasto) => {
        const mesIndex = new Date(gasto.data).getMonth()
        const nomeMes = nomesMeses[mesIndex]
        acc[nomeMes] = (acc[nomeMes] || 0) + gasto.valor
        return acc
    }, {})

    const resultado = Object.entries(gastosPorMes)
        .map(([mes, total]) => ({ mes, total }))
        .sort((a, b) => nomesMeses.indexOf(a.mes) - nomesMeses.indexOf(b.mes))

    res.status(200).json({ gastosPorMes: resultado })
})






// Start do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`)
})
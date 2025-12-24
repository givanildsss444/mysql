const db = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const JWT_SECRET = process.env.JWT_PASSWORD

exports.register = (req, res) => {
    const { nome, email, senha } = req.body

    if(!nome || !email || !senha){
        return res.status(400).json({error: 'Dados Obrigatórios não foram fornecidos.'})
    }
    const hashedPassword = bcrypt.hashSync(senha, 10)

    const sql = `INSERT INTO users (nome, email, senha)
    VALUES (?, ?, ?)`

    db.query(sql, [nome, email, hashedPassword], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        const token = jwt.sign(
            { id: result.insertId, email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({ mensagem: 'Usuário registrado com sucesso ✅', token }
        )
    })
}

exports.login = (req, res) =>{
    const { email, senha } = req.body

    if(!email || !senha){
        return res.status(400).json({error: 'Email e senha são obrigatórios.'})
    }

    const sql = `SELECT * FROM users WHERE email = ?`

    db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro no servidor' })
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Usuário não encontrado' })
      }

      const user = results[0]

      const senhaValida = bcrypt.compareSync(senha, user.senha)

      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha inválida' })
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      console.log('BACKEND LOGIN USER ID:', user.id)

      // ✅ UMA ÚNICA RESPOSTA
      return res.json({
        token,
        userId: user.id
      })
    }
  )

}
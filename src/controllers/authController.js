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

    db.query(sql, [email], (err, rows) => {
        if(err){
            return res.status(500).json(err)
        }

        if(rows.length === 0){
            return res.status(401).json({error: 'Credenciais Inválidas'})
        }

        const user = rows[0]

        const passwordMatch = bcrypt.compareSync(senha, user.senha)

        if(!passwordMatch){
            return res.status(401).json({error: 'Credenciais Inválidas'})
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({ mensagem: 'Login bem-sucedido ✅', token })
    })

}
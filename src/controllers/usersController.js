const db = require('../database/db')

exports.list = (req, res) => {
    db.query(
        'SELECT * FROM users', 
        (err, rows) => {
        if(err){
            return res.status(500).json(err)
        }
        res.json(rows)
    })
}

exports.create = (req, res) => {
    const { nome, email, idade } = req.body

    if(!nome || !email){
        return res.status(500).json({erro: 'Nome e email são obrigatórios!'})
    }

    db.query(
        'INSERT INTO users (nome, email, idade) VALUES (?, ?, ?)',
        [nome, email, idade],
        (err) => {
            if(err){
                return res.status(500).json(err)
            }
            res.status(201).json({mensagem: 'Usuário criado com sucesso ✅'})

        }
    )
}

exports.update = (req, res) => {
    const { id } = req.params
    const { nome, email,idade } = req.body

    db.query(
        'UPDATE users SET nome = ?, email = ?, idade = ? WHERE id =?',
        [nome, email, idade, id],
        (err, result) => {
            if(err){
                return res.status(500).json(err)
            }
            if(result.affectedRows === 0){
                return res.status(404).json({erro: 'Usuário não encontrado!'})

            }
            res.json({mensagem: 'Usuário atualizado com sucesso ✅'})
        }
    )

}

exports.delete = (req, res) => {
    const { id } = req.params

    db.query(
        'DELETE FROM users WHERE id = ?',
        [id],
        (err, result) => {
            if(err){
                res.status(500).json(err)
            }
            if(result.affectedRows === 0){
                return res.status(404).json({erro: 'Usuário não encontrado!'})
            }
            res.json({mensagem: 'Usuário deletado com sucesso ✅'})
        }
    )

}

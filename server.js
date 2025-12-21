const express = require('express');
const db = require('./src/database/db')

const app = express();
app.use(express.json())

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, rows) =>{
        if(err){
            return res.status(500).json({erro: err})
        }
        res.json(rows)
    })

})

app.get('/products', (req, resp) =>{
    db.query('SELECT * FROM products', (errou, low) =>{
        if(errou){
            return resp.status(500).json({erro: errou})
        }
        resp.json(low)

    })

})

app.post('/users', (req,res) =>{
    const {nome, email, idade} = req.body

    db.query(
        'INSERT INTO users (nome, email, idade) VALUES (?, ?, ?)',
        [nome, email, idade],
        (err, result) => {
            if(err){
                return res.status(500).json({erro: err})
            } 
            if(!nome || !email){
                res.status(400).json({erro: 'Nome e Email são obrigatórios!'})
            }
            res.status(201).json({id: result.insertId})
    })
})


app.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { nome, email, idade } = req.body

    db.query(
        'UPDATE users SET nome = ?, email = ?, idade = ? WHERE id = ?',
        [nome, email, idade, id],
        (err, result) => {
            if(err){
                return res.status(500).json({error: err})
            }
            if(result.affectedRows === 0){
                return res.status(404).json({error: 'Usuário não encontrado ❌'})
            }

            res.json({mensagem: 'Usuario atualizado com sucesso ✅'})

        }
    )
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params

    db.query(
        'DELETE FROM users WHERE id = ?',
        [id],
        (err, result) =>{
            if(err){
                return res.status(500).json({erro: err})
            }

            if(result.affectedRows === 0){
                return res.status(404).json({erro: 'Usuário não encontrado'})
            }

            res.json({mensagem: 'Usuário removido com sucesso ✅'})
        }
    )

})



app.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000 ✅')

})
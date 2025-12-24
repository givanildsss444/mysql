const db = require('../database/db')

exports.listForUser = (req, res) => {
  const { id } = req.params

  db.query(
    `SELECT users.nome, orders.descricao, orders.valor
     FROM orders
     JOIN users ON orders.usuario_id = users.id
     WHERE users.id = ?`,
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(rows)
    }
  )
}

exports.createForUsers = (req, res) => {
  const { descricao, valor, userId } = req.body

  if (!descricao || !valor || !userId) {
    return res.status(400).json({
      error: 'Descrição, valor e userId são obrigatórios.'
    })
  }

  db.query(
    'INSERT INTO orders (descricao, valor, usuario_id) VALUES (?, ?, ?)',
    [descricao, valor, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: 'Erro ao inserir pedido'
        })
      }

      res.status(201).json({
        id: result.insertId,
        descricao,
        valor,
        userId
      })
    }
  )
}
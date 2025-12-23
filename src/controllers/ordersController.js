const db = require('../database/db')

exports.listForUser = (req, res) => {
    const { id } = req.params

    db.query(
        'SELECT users.nome, orders.descricao, orders.valor FROM orders JOIN users ON orders.usuario_id = users.id WHERE users.id = ?',
        [id],
        (err, rows) => {
            if(err){
                return res.status(500).json({error: 'Erro ao buscar pedidos do usuário.'})
            }
            res.json(rows)

        }
    )

}
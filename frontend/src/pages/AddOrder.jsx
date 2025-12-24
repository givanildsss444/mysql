import { useState } from 'react'
import api from '../services/api'

export default function AddOrder({ onAdd }) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')

      const res = await api.post(
        '/orders',
        {
          descricao,
          valor,
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      onAdd(res.data)

      setDescricao('')
      setValor('')
    } catch (err) {
      console.error(err)
      alert('Erro ao adicionar pedido')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição do pedido"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />

      <button type="submit">Adicionar Pedido</button>
    </form>
  )
}
import { useEffect, useState } from 'react'
import api from '../services/api'
import AddOrder from './AddOrder'

export default function Orders({  onLogout }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')

        const res = await api.get(`/${userId}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setOrders(res.data)
      } catch (err) {
        console.error(err)
        alert('Erro ao carregar pedidos')
      }
    }

    fetchOrders()
  }, [])

  const addOrder = (newOrder) => {
    setOrders(prev => [...prev, newOrder])
  }

  const deleteOrder = async (orderId) => {
    const confirm = window.confirm('Tem certeza que deseja deletar este pedido?')
    if(!confirm) return

    try {
        const token = localStorage.getItem('token')

        await api.delete(`/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setOrders(prev => prev.filter(order => order.id !== orderId))

    } catch (err) {
        alert('error ao deletar pedido')
        console.error(err)
    }
  }


  return (
    <div>
      <header>
        <h2>Meus Pedidos</h2>
        <button onClick={onLogout}>Sair</button>
      </header>

      <AddOrder onAdd={addOrder} />

      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>{order.descricao}</strong> — R$ {order.valor}
            <button onClick={() => deleteOrder(order.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
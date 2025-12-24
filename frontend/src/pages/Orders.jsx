import { useEffect, useState } from 'react'
import api from '../services/api'
import AddOrder from './AddOrder'

export default function Orders() {
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

  return (
    <div>
      <h2>Meus Pedidos</h2>

      <AddOrder onAdd={addOrder} />

      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <strong>{order.descricao}</strong> — R$ {order.valor}
          </li>
        ))}
      </ul>
    </div>
  )
}
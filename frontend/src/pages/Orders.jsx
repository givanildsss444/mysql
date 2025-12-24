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
    <div className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-lg bg-gray-500 w-1/2 justify-center items-center">
      <header>
        <h2 className="text-2xl" >Meus Pedidos</h2>
      </header>

      <AddOrder onAdd={addOrder} />

      <ul>
        {orders.map(order => (
          <li key={order.id} className='flex gap-2 justify-center items-center'>
            <strong>{order.descricao}</strong> — R$ {order.valor}
            <button onClick={() => deleteOrder(order.id)} className="bg-red-500 text-white px-2  rounded">X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
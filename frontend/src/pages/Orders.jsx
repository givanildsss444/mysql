import { useState, useEffect } from "react";
import api from "../services/api";

export default function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
  const token = localStorage.getItem('token');

  api.get('/users/1/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setOrders(res.data))
  .catch(() => alert('Erro ao carregar pedidos'));
}, []);

    return(
        <div>

            <h2>Meus Pedidos</h2>

            <ul>
                {orders.map((o, index) => (
                    <li key={index}>
                        {o.descricao} - R$ {o.valor} (Cliente: {o.nome})
                    </li>
                ))}
            </ul>

        </div>
    );

}
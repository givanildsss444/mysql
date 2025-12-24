import { useState } from "react";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post('/auth/login', {
        email,
        senha
      })

      console.log('LOGIN RESPONSE:', res.data)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)

      onLogin()

    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || 'Erro no login')
      } else {
        alert('Erro de conexão com o servidor')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-lg bg-gray-500 w-1/2 justify-center items-center">

      <h2 className="text-2xl">Login</h2>
    
      <div className="flex gap-2">

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="text-center"
        />

        <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            className="text-center"
        />

      </div>
      

      <button className="p-2 bg-gray-400 rounded-lg">Entrar</button>
    </form>
  )
}
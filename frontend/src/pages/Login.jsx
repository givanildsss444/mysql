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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />

      <button type="submit">Entrar</button>
    </form>
  )
}
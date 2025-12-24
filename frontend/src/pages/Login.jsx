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

            } 
            catch (err) {
  if (err.response) {
    console.log(err.response.data);
    alert(JSON.stringify(err.response.data));
  } else {
    console.log(err);
    alert('Erro de conexão com o servidor');
  }
}

    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} />

            <button>Entrar</button>
        </form>
    )

}
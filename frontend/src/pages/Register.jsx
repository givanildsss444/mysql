import { useState } from 'react'
import api from '../services/api'

export default function Register({onRegister}) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await api.post('/auth/register', {
                nome, email, senha
            })

            alert('Registro realizado com sucesso! Agora você pode fazer login.')
            onRegister()

        } catch (err) {
            if(err.response) {
                alert('Error de Conexão!')
            }
        }

    }

    return(

        <form onSubmit={handleSubmit}>

            <h2>Cadastrar</h2>

            <input placeholder='nome' value={nome} onChange={e => setNome(e.target.value)} />
            <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='senha' value={senha} onChange={e => setSenha(e.target.value)} />

            <button>Registrar</button>

        </form>

    )

}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-lg bg-gray-500 w-1/2 justify-center items-center">

            <h2 className="text-2xl">Cadastrar</h2>

            <div className="flex gap-2">

                <input placeholder='nome' value={nome} onChange={e => setNome(e.target.value)} />
                <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='senha' value={senha} onChange={e => setSenha(e.target.value)} />

            </div>

            <button className="p-2 bg-gray-400 rounded-lg">Registrar</button>

        </form>

    )

}
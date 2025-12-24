import { useState } from 'react'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'))
  const [registering, setRegistering] = useState(false)

  const handleLogin = () => {
    setLogged(true)
  }

  const handleLogout = () => {
    localStorage.clear()
    setLogged(false)
  }

  const handleRegister = () => {
    setRegistering(false)
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {logged ? (

        <>
          <Orders />
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </>

      ) : registering ? (
        <>
          <Register onRegister={handleRegister} />
          <p>
            Já tem uma conta? 
            <button onClick={() => setRegistering(false)} className="p-2 m-2">
              Login
            </button>
          </p>

        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <p>
            Não tem uma conta? 
            <button onClick={() => setRegistering(true)} className="p-2 m-2">
              Registrar
            </button>
          </p>
        </>
      )
    
    }
    </div>

  )

}

export default App

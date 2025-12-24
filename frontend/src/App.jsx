import { useState } from 'react'
import './App.css'
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

    <div>
      {logged ? (

        <>
          <button onClick={handleLogout}>Logout</button>
          <Orders />
        </>

      ) : registering ? (
        <>
          <Register onRegister={handleRegister} />
          <p>
            Já tem uma conta? 
            <button onClick={() => setRegistering(false)}>
              Login
            </button>
          </p>

        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <p>
            Não tem uma conta? 
            <button onClick={() => setRegistering(true)}>
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

import { useState } from 'react'
import './App.css'
import Orders from './pages/Orders'
import Login from './pages/Login'

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'))

  const handleLogin = () => {
    setLogged(true)
  }

  const handleLogout = () => {
    localStorage.clear()
    setLogged(false)
  }

  return logged ? (
    <Orders onLogout={handleLogout}/>
  ) : (
    <Login onLogin={handleLogin} />
  )

}

export default App

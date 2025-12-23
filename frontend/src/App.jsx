import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Orders from './pages/Orders'
import Login from './pages/Login'

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'))

  return logged ? (
    <Orders/>
  ) : (
    <Login onLogin={() => setLogged(true)} />
  )

}

export default App

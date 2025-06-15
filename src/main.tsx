import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Konfigurator from './pages/configurator'

const customers = [
  { name: "Werner Kammerhofer", discount: 50 },
  { name: "Rollomax", discount: 58 },
  { name: "Sontec – Knapek & Co Handels KG", discount: 55 }
]

function Login() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(customers[0].name)

  const handleLogin = () => {
    localStorage.setItem("currentCustomer", selected)
    navigate("/dashboard")
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Zákaznický Login</h2>
      <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
        {customers.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
      </select>
      <button onClick={handleLogin} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Pokračovat</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Konfigurator />} />
    </Routes>
  </BrowserRouter>
)

import Admin from './pages/admin'
<Route path="/admin" element={<Admin />} />

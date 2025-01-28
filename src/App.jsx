import { LoginForm } from './components/LoginForm'
import { Home } from './components/home'
import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(null);

  return (
    <>
      <div>
        {
          !user
          ? <LoginForm setName={setUser} setToken={setToken}/>
          : <Home token={token} />
        }
      </div>
    </>
  )
}

export default App

import React, { useState } from 'react'

const Login = () => {
    const [login, setlogin] = useState(false)
    const handleLogin = ()=>{
        setlogin(!login)
    }
  return (
    <div>
        <button onClick={handleLogin}>{!login ? "login" : "logout"}</button>
        <p>{!login ?"please login" : "welcome user"}</p>
    </div>
  )
}

export default Login
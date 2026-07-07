import React from 'react'
import { useState } from 'react'
import { BASE_URL, getJsonRequest } from "../utils/api";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("")
        console.log("button clicked");
        try{
            const result = await fetch(`${BASE_URL}/auth/login`,{
                method:'post',
                headers:getJsonRequest(),
                body:JSON.stringify({email,password})
            })
            const data =await result.json();
            if(!result.ok){
                setError(data.message);
                return;
            }
            localStorage.setItem('token',data.token);
            navigate('/library')
        }catch(err){
            setError("Login failed. Check your credentials.")
        }

    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                placeholder='you@example.com'/>
                <input type="password" 
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                placeholder='.......'/>
            </div>
            <div>
                <button type='submit'>
                    Enter your Closet
                </button>
                {error && <p>{error}</p>}
            </div>
        </form>
    </div>
  )
}

export default Login
import React from 'react'
import { useState } from 'react'
import { BASE_URL, getJsonRequest } from "../utils/api";
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("")
        try{
            const result = await fetch(`${BASE_URL}/auth/register`,{
                method:'post',
                headers:getJsonRequest(),
                body:JSON.stringify({name,email,password})
            })
            const data =await result.json();
            if(!result.ok){
                setError(data.message);
                return;
            }
            alert("Created account Successfully!")
            navigate('/login')
        }catch(err){
            setError("Register failed")
        }

    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" 
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
                placeholder='John Doe'/>
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
                    Create your Closet
                </button>
                {error && <p>{error}</p>}
            </div>
        </form>
    </div>
  )
}

export default Register
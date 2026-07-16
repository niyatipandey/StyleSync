import React from 'react'
import { useState } from 'react'
import { BASE_URL, getJsonRequest } from "../utils/api";
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/login_outfit_page.png'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

    const {login} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("")
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
            login(data.token,data.user);
            toast.success("Logged in Successfully!")
            navigate('/library')
        }catch(err){
            setError("Login failed. Check your credentials.")
        }

    }
  return (
    <div
      className="h-screen w-screen overflow-hidden flex justify-end"
      style={{
        backgroundImage: window.innerWidth >= 768 ? `url(${loginImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full md:w-[44%] lg:w-[38%] bg-[#F5F1EA] md:rounded-3xl md:m-4 shadow-2xl flex flex-col px-6 sm:px-10 lg:px-14 py-6">

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-8">

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2E2621]">
           Layrd
          </h1>

          <p className="text-[#8A8072] text-sm mt-2 mb-10">
            Build your wardrobe. Create your style
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#2E2621]">
            Welcome back
          </h2>

          <p className="text-[#8A8072] text-sm mt-2 mb-6">
            Sign in to continue to your workspace
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex items-center gap-3 border border-[#DDD5C7] rounded-xl px-4 py-3 bg-white">
              <Mail size={16} className="text-[#8A8072]" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-sm placeholder:text-[#B0A797]"
              />
            </div>

            <div className="flex items-center gap-3 border border-[#DDD5C7] rounded-xl px-4 py-3 bg-white">
              <Lock size={16} className="text-[#8A8072]" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent outline-none text-sm placeholder:text-[#B0A797]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full bg-[#2E2621] text-white rounded-xl py-3 font-medium hover:bg-[#3A332B] transition"
            >
              Log In
            </button>
          </form>
          <p className="text-center text-sm text-[#3A332B] mt-6">
            New to Layrd?{" "}

            <Link
              to="/register"
              className="text-[#B87A4A] font-medium inline-flex items-center gap-1 hover:underline"
            >
              Create your account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login
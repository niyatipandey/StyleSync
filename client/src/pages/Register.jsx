import React from 'react'
import { useState } from 'react'
import { BASE_URL, getJsonRequest } from "../utils/api";
import { useNavigate } from 'react-router-dom'
import { Mail, Lock ,User } from 'lucide-react';
import { Link } from 'react-router-dom';
import registerImg from '../assets/register_outfit_page.png'
import toast from 'react-hot-toast';

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
            toast.success("Created account Successfully!")
            navigate('/login')
        }catch(err){
            setError("Register failed")
        }

    }

  return (
      <div
        className="min-h-screen w-full flex justify-end"
        style={{
          backgroundImage: window.innerWidth >= 768 ? `url(${registerImg})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center 28%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full md:w-[44%] lg:w-[38%] bg-[#F5F1EA] md:rounded-3xl md:m-4 shadow-2xl flex flex-col px-6 sm:px-10 lg:px-14 py-6">
  
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-8">
  
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2E2621]">
              Layrd
            </h1>
            <p className="text-[#8A8072] text-sm mt-2 mb-6">
              Build your wardrobe. Create your style.
            </p>
  
            <h2 className="font-serif text-2xl md:text-3xl text-[#2E2621] mb-2">
                Create your account
            </h2>
  
  
            <form onSubmit={handleSubmit} className="space-y-4">
  
              <div className="flex items-center gap-3 border border-[#DDD5C7] rounded-xl px-4 py-3 bg-white">
                <User size={16} className="text-[#8A8072]" />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-transparent outline-none text-sm placeholder:text-[#B0A797]"
                />
              </div>
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
                Create Account
              </button>
            </form>
            <p className="text-center text-sm text-[#3A332B] mt-6">
              Already have an account?{" "}
  
              <Link
                to="/login"
                className="text-[#B87A4A] font-medium inline-flex items-center gap-1 hover:underline"
              >
                Login
              </Link>
            </p>
  
          </div>
        </div>
      </div>
    );
}

export default Register
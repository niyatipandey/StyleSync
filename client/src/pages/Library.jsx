import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../utils/api'
import Navbar from '../components/Navbar'

const Library = () => {
    const [activeCategory, setActiveCategory] = useState("tops")
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        async function fetchItems(){
            try{
                let url = `${BASE_URL}/items/`

                if(activeCategory !== 'all'){
                    url += `?category=${activeCategory}`
                }
                const result = await fetch(url);
                const data =await result.json();
                if(!result.ok){
                    return;
                }
                setItems(data)
                setLoading(false)

            }catch(err){
                console.log(err)
            }
        }
        fetchItems();
    },[activeCategory])

    const categories = [
        { label: "All", value: "all" },
        { label: "Tops", value: "tops" },
        { label: "Bottoms", value: "bottom" },
        { label: "Shoes", value: "shoes" },
        { label: "Accessories", value: "accessory" },
    ];
    
    
  return (
    <>
        <Navbar/>
        <main className='max-w-7xl mx-auto px-8 py-10'>
            <div className='flex items-start justify-between gap-12 mb-10'>
                <div className='w-fit'>
                    <h1 className='font-serif text-5xl text-[#2E2621]'>Library</h1>
                    <p className='text-[#8A8072] mt-2'>Browse and discover wardrobe pieces</p>
                </div>
                <div className="w-[65%] relative">
                    <input
                        type="text"
                        placeholder="Search your wardrobe..."
                        className="w-full rounded-2xl border border-[#DDD5C7] bg-white py-4 pl-14 pr-5 text-[#2E2621] placeholder:text-[#A69B8C] outline-none focus:border-[#B87A4A]"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8072]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                        />
                    </svg>
                </div>
            </div>
            <div className='flex mb-10 justify-between'>
                {categories.map((category)=>(
                    <button key={category.value}
                    onClick={()=>{
                        setActiveCategory(category.value)
                    }}
                    className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-200 cursor-pointer
                    ${
                    activeCategory === category
                        ? "bg-[#E7C76A] text-[#2E2621] shadow-md"
                        : "bg-white text-[#2E2621] border border-[#E5DDD2] shadow-sm hover:bg-[#F8F4EE]"
                    }`}>
                        {category.label}
                    </button>
                ))}
            </div>
            <div className='grid grid-cols-3 gap-8'>
                {items.map((item)=>{
                return <div key={item._id} className='bg-white rounded-2xl shadow-sm'>
                    <img src={item.imageUrl}  alt={item.name}
                    className='w-full h-80 object-contain p-4' />
                    <h3 className='mt-4 text-base font-medium text-[#2E2621]'>{item.name}</h3>
                    <p className='text-sm text-[#8A8072]'>{item.color}</p>
                </div>
            })}
            </div>
        </main>
    </>
  )
}

export default Library
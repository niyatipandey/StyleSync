import React,{ useState , useEffect} from 'react'
import Navbar from '../components/Navbar'
import { BASE_URL, getAuthHeader } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { OutfitCard } from '../components/OutfitCard'

const Wardrobe = () => {

  const navigate = useNavigate();

  const [outfits, setOutfits] = useState([])

  async function getOutfit(){
    try{
      const response = await fetch(`${BASE_URL}/outfits`,{
        headers: getAuthHeader()
      })
      if(!response.ok){
        return;
      }
      const data = await response.json();
      setOutfits(data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getOutfit();
  },[]);

  async function deleteOutfit(id){
    try{
        const response = await fetch(`${BASE_URL}/outfits/${id}`,{
            method: "DELETE",
            headers: getAuthHeader()
        })
        const result = await response.json()

        if(!response.ok){
            toast.error(result.message);
            return;
        }
        setOutfits((prev)=> prev.filter((outfit)=> outfit._id !== id));
        toast.success("Outfit deleted Successfully!")
    }catch(err){
        console.log(err);
    }
  }

  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-8 py-10'>
        <div className='mb-8'>
          <h1 className='font-serif text-5xl text-[#2E2621]'>My Wardrobe</h1>
          <p className='text-[#8A8072] mt-2'> Your saved outfits in one place</p>
        </div>
        <button className="px-5 py-3 rounded-xl bg-[#2E2621] text-white hover:scale-105 transition-all"
        onClick={() => navigate("/canvas")}>
          + New Outfit
        </button>
        <div className='grid grid-cols-3 gap-6 mt-8'>
          {outfits.map((outfit)=>(
            <OutfitCard key={outfit._id} outfit={outfit}
            onDelete={()=> deleteOutfit(outfit._id)} />
          ))}
        </div>
      </main>
    </>
  )
}

export default Wardrobe
import React,{ useState } from 'react'
import Navbar from '../components/Navbar'
import ClothingPanel from '../components/ClothingPanel'
import CanvasSlot from '../components/CanvasSlot'
import { DndContext } from '@dnd-kit/core'
import { BASE_URL, getAuthHeader } from '../utils/api'

const Canvas = () => {

  const [selectedOutfit, setSelectedOutfit] = useState({
    top:null,
    bottom:null,
    shoes:null,
    accessory:null
  })

  const categoryMap = {
  top: "top",
  bottom: "bottom",
  shoes: "shoes",
  accessory: "accessory",
};

  function handleDragEnd(event){
    const {active,over} = event
    if(!over){
      return;
    }
    const draggedItem = active.data.current.item;
    if (categoryMap[draggedItem.category] !== over.id) {
      return;
    }
    setSelectedOutfit((prev)=>({
      ...prev,
      [over.id]: draggedItem,
    }))
  }


  async function saveOutfit() {
    try{
      if (!selectedOutfit.top && !selectedOutfit.bottom && !selectedOutfit.shoes && !selectedOutfit.accessory) {
        alert("Please add at least one item.");
        return;
      }
      const outfitData = {
      top: selectedOutfit.top?._id,
      bottom: selectedOutfit.bottom?._id,
      shoes: selectedOutfit.shoes?._id,
      accessory: selectedOutfit.accessory?._id,
      }

      const response = await fetch(`${BASE_URL}/outfits`,{
        method:'post',
        headers:getAuthHeader(),
        body:JSON.stringify(outfitData),
      })
      const result = await response.json();
      if(!response.ok){
        alert(result.message);
        return;
      }
      console.log(result)
      alert("Outfit saved successfully")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-8 py-10'>
        <div className='mb-8'>
          <h1 className='font-serif text-5xl text-[#2E2621]'>Outfit Builder</h1>
          <p className='text-[#8A8072] mt-2'>Create your next look from your wardrobe</p>
        </div>
        <DndContext onDragEnd={handleDragEnd}>
          <div className='flex gap-10 items-start'>
            <div className='w-[35%]'>
              <h3 className="text-xl font-semibold text-[#2E2621] mb-5">Wardrobe Selection</h3>
              <ClothingPanel columns={2} scroll={true} showAllCategory={false}/>
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className="text-xl font-semibold text-[#2E2621] mb-6">Canvas</h3>
              <div className="space-y-6">
                <CanvasSlot
                    icon="👚"
                    title="Top"
                    selectedItem = {selectedOutfit.top}
                    onRemove={()=>(
                      setSelectedOutfit((prev)=>({
                        ...prev,
                        top:null
                      }))
                    )}
                />

                <CanvasSlot
                    icon="👖"
                    title="Bottom"
                    selectedItem = {selectedOutfit.bottom}
                    onRemove={()=>(
                      setSelectedOutfit((prev)=>({
                        ...prev,
                        bottom:null
                      }))
                    )}
                />

                <CanvasSlot
                    icon="👟"
                    title="Shoes"
                    selectedItem = {selectedOutfit.shoes}
                    onRemove={()=>(
                      setSelectedOutfit((prev)=>({
                        ...prev,
                        shoes:null
                      }))
                    )}
                />

                <CanvasSlot
                    icon="👜"
                    title="Accessory"
                    selectedItem = {selectedOutfit.accessory}
                    onRemove={()=>(
                      setSelectedOutfit((prev)=>({
                        ...prev,
                        accessory:null
                      }))
                    )}
                />
              </div>
            </div>
            <div className='flex flex-col gap-5 items-start w-[180px] pt-12'>
              <button className='w-full py-3 rounded-xl bg-[#2E2621] text-white hover:scale-105 transition-all'
              onClick={()=>{
                saveOutfit();
              }}>Save Outfit</button>
              <button className='w-full py-3 rounded-xl border border-[#2E2621] bg-[#E7C76A] font-medium hover:scale-105 transition-all'>AI Stylist</button>
              <button className='w-full py-3 rounded-xl border border-[#DDD5C7] bg-white hover:scale-105 transition-all'
              onClick={()=>{
                setSelectedOutfit({
                  top:null,
                  bottom:null,
                  shoes:null,
                  accessory:null
                })
              }}>Clear</button>
            </div>
          </div>
          </DndContext>
      </main>
    </>
  )
}

export default Canvas
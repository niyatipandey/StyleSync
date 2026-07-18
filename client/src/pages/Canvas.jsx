import React,{ useState } from 'react'
import Navbar from '../components/Navbar'
import ClothingPanel from '../components/ClothingPanel'
import CanvasSlot from '../components/CanvasSlot'
import { DndContext, PointerSensor,useSensor,useSensors} from '@dnd-kit/core'
import { BASE_URL, getAuthHeader } from '../utils/api'
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const Canvas = () => {

  const [selectedOutfit, setSelectedOutfit] = useState({
    top:null,
    bottom:null,
    shoes:null,
    accessory:null
  })

  const [isStyling, setIsStyling] = useState(false)

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

  const handleMobileSelect = (item) => {
    setSelectedOutfit(prev => ({
      ...prev,
      [categoryMap[item.category]]: item
    }));
  };


  async function saveOutfit() {
    try{
      if (!selectedOutfit.top && !selectedOutfit.bottom && !selectedOutfit.shoes && !selectedOutfit.accessory) {
        toast.error("Please add at least one item.");
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
        toast.error(result.message);
        return;
      }
      toast.success("Outfit saved successfully!")
    }catch(err){
      console.log(err);
    }
  }

  async function aiSuggestion(){
    setIsStyling(true)
    try{
      if(
        selectedOutfit.top &&
        selectedOutfit.bottom &&
        selectedOutfit.shoes &&
        selectedOutfit.accessory
      ){
        toast.error("Your outfit is already complete");
        setIsStyling(false);
        return;
      }
      
      if (
        !selectedOutfit.top &&
        !selectedOutfit.bottom &&
        !selectedOutfit.shoes &&
        !selectedOutfit.accessory
      ) {
        toast.error("Please add at least one clothing item before using AI Stylist.");
        return;
      }

      const outfitData = {
          top: selectedOutfit.top?.name,
          bottom: selectedOutfit.bottom?.name,
          shoes: selectedOutfit.shoes?.name,
          accessory: selectedOutfit.accessory?.name,
      }

      const response = await fetch(`${BASE_URL}/ai/suggest`,{
        method:"POST",
        headers:getAuthHeader(),
        body:JSON.stringify(outfitData)
      })
      const data = await response.json();
      if(!response.ok){
        toast.error(data.message);
        setIsStyling(false);
        return;
      }
      setSelectedOutfit((prev)=>({
        ...prev,
        top: prev.top || data.top || null,
        bottom: prev.bottom || data.bottom || null,
        shoes: prev.shoes || data.shoes || null,
        accessory: prev.accessory || data.accessory || null
      }))
      toast.success("✨ Outfit completed by AI!");
      setIsStyling(false)
    }catch(err){
      console.log(err);
      setIsStyling(false);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor ,{
      activationConstraint: {
        distance: 8,
      }
    }),
  )

  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='mb-8'>
          <h1 className='font-serif text-5xl text-[#2E2621]'>Outfit Builder</h1>
          <p className='text-[#8A8072] mt-2'>Create your next look from your wardrobe</p>
        </div>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <div className='flex flex-col lg:flex-row gap-10 items-start'>
            <div className='w-full lg:w-[35%]'>
              <h3 className="text-xl font-semibold text-[#2E2621] mb-5">Wardrobe Selection</h3>
              <ClothingPanel columns={2} mobileScroll={true} desktopScroll={true} showAllCategory={false} onSelect={handleMobileSelect} />
            </div>
            <div className='w-full lg:flex-1 min-w-0'>
              <h3 className="text-xl font-semibold text-[#2E2621] mb-6">Canvas</h3>
              <div className="space-y-6">
                <div className='grid grid-cols-2 gap-4'>
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
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[180px] flex flex-col gap-5 lg:pt-12'>
              <button className='cursor-pointer w-full py-3 rounded-xl bg-[#2E2621] text-white hover:scale-105 transition-all'
                  onClick={()=>{
                    saveOutfit();
                  }}>Save Outfit</button>
                  <button
                disabled={isStyling}
                className={`cursor-pointer w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2
                ${
                  isStyling
                    ? "bg-gray-300 text-[#2E2621] cursor-not-allowed"
                    : "border border-[#2E2621] bg-[#E7C76A] hover:scale-105"
                }`}
                onClick={aiSuggestion}>
                {isStyling ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Styling...</span>
                  </>
                ) : (
                  "✨ AI Stylist"
                )}
              </button>
              <button className='cursor-pointer w-full py-3 rounded-xl border border-[#DDD5C7] bg-white hover:scale-105 transition-all'
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
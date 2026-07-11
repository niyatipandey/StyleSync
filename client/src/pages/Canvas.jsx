import React from 'react'
import Navbar from '../components/Navbar'
import ClothingPanel from '../components/ClothingPanel'
import CanvasSlot from '../components/CanvasSlot'

const Canvas = () => {

  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-8 py-10'>
        <div className='mb-8'>
          <h1 className='font-serif text-5xl text-[#2E2621]'>Outfit Builder</h1>
          <p className='text-[#8A8072] mt-2'>Create your next look from your wardrobe</p>
        </div>
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
              />

              <CanvasSlot
                  icon="👖"
                  title="Bottom"
              />

              <CanvasSlot
                  icon="👟"
                  title="Shoes"
              />

              <CanvasSlot
                  icon="👜"
                  title="Accessory"
              />
            </div>
          </div>
          <div className='flex flex-col gap-5 items-start w-[180px] pt-12'>
            <button className='w-full py-3 rounded-xl bg-[#2E2621] text-white hover:scale-105 transition-all'>Save Outfit</button>
            <button className='w-full py-3 rounded-xl border border-[#2E2621] bg-[#E7C76A] font-medium hover:scale-105 transition-all'>AI Stylist</button>
            <button className='w-full py-3 rounded-xl border border-[#DDD5C7] bg-white hover:scale-105 transition-all'>Clear</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Canvas
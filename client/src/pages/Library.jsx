import Navbar from '../components/Navbar'
import ClothingPanel from '../components/ClothingPanel'

const Library = () => {
    
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
            <ClothingPanel columns={3} scroll={false} showAllCategory={true}/>
        </main>
    </>
  )
}

export default Library
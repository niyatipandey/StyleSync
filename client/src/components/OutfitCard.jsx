import React from 'react'
import { BASE_URL, getAuthHeader } from '../utils/api'

export const OutfitCard = ({outfit,onDelete }) => {

  return (
      <div className='bg-white rounded-3xl shadow-sm p-6 hover:shadow-lg transition-all'>
        Saved on {new Date(outfit.createdAt).toLocaleDateString()}
        <div className='flex justify-evenly items-center mt-6'>
            {outfit.slots.top && (
                <img src={outfit.slots.top.imageUrl}
                className="w-24 h-24 object-contain" />
            )}
            {outfit.slots.bottom && (
                <img src={outfit.slots.bottom.imageUrl}
                className="w-24 h-24 object-contain" />
            )}
            {outfit.slots.shoes && (
                <img src={outfit.slots.shoes.imageUrl}
                className="w-24 h-24 object-contain" />
            )}
            {outfit.slots.accessory && (
                <img src={outfit.slots.accessory.imageUrl}
                className="w-24 h-24 object-contain" />
            )}
        </div>
        <button className="mt-6 text-red-500 hover:text-red-700"
        onClick={onDelete}>
            Delete
        </button>
      </div>
    )
}

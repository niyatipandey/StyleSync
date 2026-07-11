import React from 'react'
import { useState } from 'react'

const CanvasSlot = ({ icon, title ,item }) => {
    return (
        <div className="h-40 rounded-3xl border-2 border-dashed border-[#DDD5C7] bg-[#FCFAF7] flex flex-col items-center justify-center">
            <span className="text-3xl mb-2">
              {icon}
            </span>
            <p className="font-medium text-[#2E2621]">
              {title}
            </p>
            <p className="text-sm text-[#8A8072]">
              Drag item here
            </p>
        </div>
    );
};

export default CanvasSlot;
import React from "react";
import {useDraggable } from "@dnd-kit/core";

const ClothingCard = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item._id,
    data: {
      item,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: transform ? 999 : "auto",
    opacity: isDragging ? 0.85 : 1,
  };

  const isMobile = window.innerWidth < 768;

  const handleClick = () => {
    if (!isMobile) return;

    onSelect(item);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group w-28 sm:w-32 lg:w-full mx-auto bg-white rounded-2xl shadow-sm cursor-grab active:cursor-grabbing overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative w-full aspect-square bg-[#F8F5F0] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          draggable={false}
          className="w-full h-full object-contain p-1.5 lg:p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-2 py-2 sm:px-3 sm:py-3 border-t border-[#F0EBE3]">
        <h3 className="mt-2 lg:mt-4 text-sm lg:text-base font-medium text-[#2E2621] line-clamp-2">
          {item.name}
        </h3>

        <p className="text-xs lg:text-sm text-[#8A8072]">
          {item.color}
        </p>
      </div>
    </div>
  );
};

export default ClothingCard;
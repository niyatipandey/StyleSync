import React , {forwardRef} from "react";
import { useDroppable } from "@dnd-kit/core";

const CanvasSlot = forwardRef(
({ icon, title, selectedItem,highlight , onRemove }, ref) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title.toLowerCase(),
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (ref) {
          if (typeof ref === "function") {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      className={`relative h-60 sm:h-44  rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden
      ${highlight
        ? "ring-4 ring-[#E7C76A] border-[#E7C76A] transition-all duration-300"
        : ""
      }
      ${
        isOver
          ? "bg-green-100 border-green-400"
          : "bg-[#FCFAF7] border-[#DDD5C7]"
      }`}
    >
      {selectedItem? (
        <>
          <button
            onClick={onRemove}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow hover:bg-red-50"
          >
            ✕
        </button>
          <img
            src={selectedItem.imageUrl}
            alt={selectedItem.name}
            className="max-h-[75%] w-auto object-contain"
          />
          <p className="text-sm font-medium text-center line-clamp-2">{selectedItem.name}</p>
        </>
      ) : (
        <>
          <span className="text-3xl mb-2">{icon}</span>
          <p className="font-medium text-[#2E2621]">{title}</p>
          <p className="text-sm text-[#8A8072]">Drag item here</p>
        </>
      )}
    </div>
  );
});

CanvasSlot.displayName = "CanvasSlot";
export default CanvasSlot;
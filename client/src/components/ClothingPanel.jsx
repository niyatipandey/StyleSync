import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api";
import ClothingCard from "./ClothingCard";

const ClothingPanel = ({columns,desktopScroll="",showAllCategory,mobileScroll,searchQuery = "",onSelect}) => {
  const [activeCategory, setActiveCategory] = useState("top");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { label: "All", value: "all" },
    { label: "Tops", value: "top" },
    { label: "Bottoms", value: "bottom" },
    { label: "Shoes", value: "shoes" },
    { label: "Accessories", value: "accessory" },
  ];

  const visibleCategories = showAllCategory ? categories : categories.filter(category => category.value !== "all");

  useEffect(() => {
    setLoading(true);

    async function fetchItems() {
      try {
        let url = `${BASE_URL}/items`;

        if (activeCategory !== "all") {
          url += `?category=${activeCategory}`;
        }

        const result = await fetch(url);
        const data = await result.json();

        if (!result.ok) return;
        setItems(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [activeCategory]);

  const filteredItems = items.filter((item)=>{
    return(
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <>
      <div className="flex gap-3 mb-8 overflow-y-auto whitespace-nowrap pb-2 justify-between">
        {visibleCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-base font-medium transition-all duration-200 cursor-pointer
              ${
                activeCategory === category.value
                  ? "bg-[#E7C76A] text-[#2E2621] shadow-md"
                  : "bg-white text-[#2E2621] border border-[#E5DDD2] shadow-sm hover:bg-[#F8F4EE]"
              }`}>
            {category.label}
          </button>
        ))}
      </div>
      <div
        className={`grid gap-3 ${
          columns === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"
        } ${
          mobileScroll
            ? "max-lg:max-h-[60vh] max-lg:overflow-y-auto"
            : ""
        } ${
          desktopScroll
            ? "lg:max-h-[64vh] lg:overflow-y-auto"
            : ""
          }`}>
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="w-28 sm:w-32 lg:max-w-none lg:w-full mx-auto">
            <ClothingCard item={item} onSelect={onSelect}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClothingPanel;
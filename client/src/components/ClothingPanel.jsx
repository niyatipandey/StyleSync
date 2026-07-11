import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api";
import ClothingCard from "./ClothingCard";

const ClothingPanel = ({columns,scroll,showAllCategory}) => {
  const [activeCategory, setActiveCategory] = useState("tops");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { label: "All", value: "all" },
    { label: "Tops", value: "tops" },
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

  return (
    <>
      <div className="flex mb-10 justify-between">
        {visibleCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-200 cursor-pointer
              ${
                activeCategory === category.value
                  ? "bg-[#E7C76A] text-[#2E2621] shadow-md"
                  : "bg-white text-[#2E2621] border border-[#E5DDD2] shadow-sm hover:bg-[#F8F4EE]"
              }`}>
            {category.label}
          </button>
        ))}
      </div>

      <div className={`grid gap-8 ${columns === 2 ? "grid-cols-2" : "grid-cols-3"} ${scroll ? "max-h-[64vh] overflow-y-auto pr-2" : ""}`}>
        {items.map((item) => (
          <ClothingCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ClothingPanel;
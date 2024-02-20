"use client";
import { CategoryService } from "@/app/api/category.js";
import Image from "next/image";
import { useState, useEffect } from "react";
import CategoryItem from "./Category-Item";

interface CategoriesProps {
  id: string;
  name: string;
  image: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await CategoryService.getCategories();
      setCategories(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-2 px-5">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;

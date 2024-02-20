"use client";

import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-badge";
import Link from "next/link";

interface CategoryItemProps {
  category: any;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center py-3 gap-3 rounded-lg hover:cursor-pointer"
    >
      {CATEGORY_ICON[category.name as keyof typeof CATEGORY_ICON]}
      <span className="font-bold text-xs ">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;

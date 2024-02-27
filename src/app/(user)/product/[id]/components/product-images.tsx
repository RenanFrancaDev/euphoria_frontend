"use client";

import { ProductListProps } from "@/lib/productProps";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ product }: ProductListProps) => {
  const [currentImage, setCurrentImage] = useState(product.imageUrls[0]);
  // console.log(imageUrls);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-tranparent">
        <Image
          src={`/fotos/products/${product.id}/${currentImage}`}
          alt={product.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 px-5">
        {product.imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[200px] items-center justify-center rounded-lg bg-transparent
                ${
                  imageUrl === currentImage &&
                  "border-2 border-solid border-primary"
                }
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={`/fotos/products/${product.id}/${imageUrl}`}
              alt={product.name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

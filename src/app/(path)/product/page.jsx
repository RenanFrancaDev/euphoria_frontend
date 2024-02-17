"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Product = () => {
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        "http://localhost:4000/upload-productsimg/1"
      );

      setImagens(response.data.data);
      console.log(response.data.data);
    };

    getProducts();
  }, []);

  return (
    <div>
      {imagens.length > 0 &&
        imagens.map((imagem, index) => {
          return (
            <Image
              key={index}
              src={`http://localhost:3000/fotos/${imagem.product_id}/${imagem.image}`}
              alt="foto"
              width={100}
              height={100}
            />
          );
        })}
    </div>
  );
};

export default Product;

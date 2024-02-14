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
    };

    getProducts();
  }, []);

  return (
    <div>
      {imagens.map((imagem, index) => {
        <Image
          key={index}
          src={`C:/Users/renan/OneDrive/Documentos/Projetos/Euphoria_ecommerce/backend/public/img_products/${imagem.id}/${imagem.image}`}
          alt="foto"
          width={100}
          height={100}
        />;
      })}
    </div>
  );
};

export default Product;

// {`C:/Users/renan/OneDrive/Documentos/Projetos/Euphoria_ecommerce/backend/public/img_products/1/1707883517550_forfun.png`}

"use client";

import React, { useState } from "react";
import axios from "axios";

const CadastroForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [desconto, setDesconto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagens, setimagens] = useState("");

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };

  const handleDescontoChange = (event) => {
    setDesconto(event.target.value);
  };

  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
  };

  const handleImagensChange = (event) => {
    setimagens(event.target.value);
  };

  // const handleimagesChange = (index, value) => {
  //   const newimages = [...images];
  //   newimages[index] = value;
  //   setimages(newimages);
  //   console.log(images);
  // };

  // const handleAddImage = () => {
  //   setimages([...images, ""]);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/products", {
        name: nome,
        description: descricao,
        price: preco,
        discount: desconto,
        quantity_stock: quantidade,
        imageUrls: imagens,
      });
      console.log("cadastrado");
    } catch (error) {
      console.log(error.response.data);
    }

    // Limpar os campos do formulário
    // setNome("");
    // setDescricao("");
    // setPreco("");
    // setDesconto("");
    // setQuantidade("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-8 w-[800px] bg-slate-500"
    >
      <label>
        Nome:
        <input type="text" value={nome} onChange={handleNomeChange} />
      </label>
      <br />
      <label>
        Descrição:
        <input type="text" value={descricao} onChange={handleDescricaoChange} />
      </label>
      <br />
      <label>
        Preço:
        <input type="text" value={preco} onChange={handlePrecoChange} />
      </label>
      <br />
      <label>
        Desconto:
        <input type="text" value={desconto} onChange={handleDescontoChange} />
      </label>
      <br />
      <label>
        Quantidade:
        <input
          type="text"
          value={quantidade}
          onChange={handleQuantidadeChange}
        />
      </label>
      <br />
      <label>
        Imagens:
        <input type="text" value={imagens} onChange={handleImagensChange} />
      </label>
      {/* {images.map((image, index) => (
        <label key={index}>
          Imagem:
          <input
            value={image}
            onChange={(e) => handleimagesChange(index, e.target.value)}
          />
        </label>
      ))} */}
      {/* <button type="button" onClick={handleAddImage}>
        Adicionar Imagens
      </button> */}
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroForm;

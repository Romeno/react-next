"use client";

import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import produtosData from "@/app/data/produtos.json";
import { Produto } from "@/app/models/interfaces";
import styles from "../../components/Card/Card.module.css";

export default function Produtos() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Produto[]>([]); // Estado para o carrinho

  // Função para adicionar um produto ao carrinho
  const addToCart = (produto: Produto) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, produto];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Salva o carrinho no localStorage
      return updatedCart;
    });
  };

  // Recupera os produtos do carrinho do localStorage quando a página é carregada
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Filtrando produtos com base no search
  const filteredProducts = produtosData.filter((produto: Produto) =>
    produto.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular o preço total do carrinho
  const totalPrice = cart.reduce((total, produto) => total + (produto.price || 0), 0);

  return (
    <div>
      <h1 className="text-center">Produtos</h1>

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid-container">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((produto: Produto) => (
            <div key={produto.id}>
              {/* Card do produto */}
              <Card produto={produto} />
              {/* Botão de adicionar ao carrinho */}
              <button onClick={() => addToCart(produto)}>
                Adicionar ao Carrinho
              </button>
            </div>
          ))
        )}
      </div>

      {/* Exibindo o carrinho */}
      <div className={styles.cesto}>
        <h1 className={styles["product-cesto"]}>
          Preço Total: {totalPrice.toFixed(2)}€
        </h1>
        <h2>Produtos no Carrinho</h2>
        <ul>
          {cart.map((produto) => (
            <li key={produto.id}>
              {produto.title} - {produto.price}€
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import Card from '@/components/Card/Card'; 
import produtosData from '@/private/data/produtos.json'; 
import  { Produto } from "@/app/models/interfaces";
import styles from '../../components/Card/Card.module.css';
import { /*use,*/ useEffect, useState } from 'react';

export default function Produtos() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Produto[]>([]);
  const [cart, setCart] = useState<Produto[]>([]);

  //FIXME:guardar no localStorage(ver melhor)
  //FIXME:corrigir a parte de remover produtos iguais
  useEffect(() =>{
    const newFilteredData = produtosData.filter((Produto) => {
      return Produto.title.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredData(newFilteredData);

  }, [search,produtosData])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    console.log(cart); //debug
  }, [cart]);

  const addToCart = (produto: Produto) => {
    setCart((prevCart) => [...prevCart, produto]);
  };

  const removeFromCart = (produto: Produto) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== produto.id)//FIXME:
    );
  };

  //FIXME: nao sei o que esta a falhar
  const buy = () => {
    const payload = {
    products: cart.map((produto: Produto) => produto.id), 
    student: false, 
    coupon: "" ,
    name: ""
  };

  console.log("Dados enviados no body do fetch:", JSON.stringify(payload, null, 2));

  fetch("/api/deisishop", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
    }).then(response => {
      console.log("Resposta recebida:", response);//debug
      if(!response.ok){
        throw new Error(response.statusText);
      }
      return response.json();
    /*}).then((response) => {
      setCart([])*/
    }).catch(() => {
      console.log("erro ao comprar")
    })
  }

  return (
    <div>
      <h1 className='text-center'>Produtos</h1>
      <div className="grid-container">
        <input
          className={styles['search-Product']}
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredData.map((produto: Produto) => (
          <Card key={produto.id} produto={produto} addToCart={addToCart}/>
        ))}
      </div>
      <div className={styles.cesto}>
        <h1 className={styles['product-cesto']}>Preço Total: 0.00€</h1>
        {cart.map((produto, index) => (
              <Card
                key={index}
                produto={produto}
                addToCart={addToCart}
                isInCart={true} 
                removeFromCart={removeFromCart} 
              />
            ))}
      <button onClick={buy} className={styles['btn-comprar']}>Comprar</button>
      </div>
    </div>
  );
}

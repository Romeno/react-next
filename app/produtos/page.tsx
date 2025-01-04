"use client";

import Card from "../../components/Card/Card";
import produtosData from "@/app/data/produtos.json";
import { Produto } from "@/app/models/interfaces";
import styles from "../../components/Card/Card.module.css";

export default function Produtos() {
  return (
    <div>
      <h1 className="text-center">Produtos</h1>
      <div className="grid-container">
        {JSON.parse(JSON.stringify(produtosData)).map((produto: Produto) => (
          <Card key={produto.id} produto={produto} />
        ))}
      </div>
      <div className={styles.cesto}>
        <h1 className={styles["product-cesto"]}>Preço Total: 0.00€</h1>
      </div>
    </div>
  );
}

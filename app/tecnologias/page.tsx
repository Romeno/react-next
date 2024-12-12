"use client";
import tecnologias from "@/app/data/tecnologias.json";
import Card from "../../components/Card/Card";
import { Produto } from "@/app/models/interfaces";

export default function Tecnologias() {
  return (
    <div>
      <h1 className="text-center">Tecnologias que Aprendi</h1>
      <div className="grid-container">
        {tecnologias.map((produto: Produto) => (
          <Card key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}

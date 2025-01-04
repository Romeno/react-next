import React from 'react'
import styles from './Header.module.css';
import Link from 'next/link';

//por definir progs e sobre
interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav className={styles.nav}>
        <Link href="/">Home </Link>
        <Link href="/progs">Programadores </Link>
        <Link href="/sobre">Sobre </Link>
        <Link href="/produtos">Produtos</Link>
        <Link href="/tecnologias">Tecnologias</Link>
      </nav>
    </header>
  )
}
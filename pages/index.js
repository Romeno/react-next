import { useState, useEffect } from 'react';
import Cart from '../components/Cart';

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      {/* ...existing code... */}
      <ProductList addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
}

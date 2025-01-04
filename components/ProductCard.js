export default function ProductCard({ product, addToCart }) {
  return (
    <div>
      {/* ...existing code... */}
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

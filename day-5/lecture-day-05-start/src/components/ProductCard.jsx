import AddToCartButton from './AddToCartButton.jsx'

function ProductCard({ product }) {
  return (
    <div className="border rounded p-3">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <AddToCartButton product={product} />
    </div>
  )
}
export default ProductCard

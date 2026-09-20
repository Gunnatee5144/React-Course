import ProductCard from './ProductCard.jsx'
import { products } from '../data/products.js'

function ProductGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
export default ProductGrid

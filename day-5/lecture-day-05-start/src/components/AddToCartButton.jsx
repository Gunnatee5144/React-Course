import { useCart } from '../context/CartContext.jsx'

function AddToCartButton({ product }) {
  const { items, addItem } = useCart()
  const qty = items.find(i => i.id === product.id)?.qty ?? 0
  return (
    <button onClick={() => addItem(product)}
      className="w-full bg-blue-600 text-white py-2 rounded">
      ใส่ตะกร้า {qty > 0 && `(${qty})`}
    </button>
  )
}
export default AddToCartButton

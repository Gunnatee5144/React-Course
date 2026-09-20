import { useCart } from '../context/CartContext.jsx'

function CartDrawer() {
  const { items, removeItem, decreaseItem, clear, totalPrice } = useCart()

  if (items.length === 0) return <p className="mt-8 pt-4 border-t text-gray-500">ตะกร้าว่างเปล่า</p>

  return (
    <div className="mt-8 pt-4 border-t space-y-2">
      {items.map(i => (
        <div key={i.id} className="flex items-center gap-3">
          <span className="flex-1">{i.name} × {i.qty}</span>
          <button onClick={() => decreaseItem(i.id)} className="border w-8 rounded">-</button>
          <button onClick={() => removeItem(i.id)} className="text-red-600 text-sm">ลบ</button>
        </div>
      ))}
      <p className="font-bold">รวม {totalPrice} บาท</p>
      <button onClick={clear} className="text-sm text-gray-500 underline">ล้างตะกร้า</button>
    </div>
  )
}
export default CartDrawer

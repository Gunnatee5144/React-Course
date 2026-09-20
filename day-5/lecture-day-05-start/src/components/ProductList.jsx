import { memo, useCallback, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const ExpensiveProductCard = memo(function ExpensiveProductCard({ product, onAdd }) {
  console.log("render:", product.name);
  let total = 0;
  for (let i = 0; i < 2_000_000; i++) total += i;
  return (
    <div className="border rounded p-3">
      {product.name} — {product.price} บาท
      <button
        onClick={() => onAdd(product)}
        className="block mt-2 border px-2 py-1 rounded"
      >
        ใส่ตะกร้า
      </button>
    </div>
  );
});

function ProductList({ products }) {
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  const handleAdd = useCallback((product) => addItem(product), [addItem]);
  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ค้นหาสินค้า"
        className="border p-2 rounded w-full mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <ExpensiveProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}
export default ProductList;

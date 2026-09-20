import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      return found
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const decreaseItem = (id) =>
    setItems((prev) =>
      prev.flatMap((item) =>
        item.id === id
          ? item.qty > 1
            ? [{ ...item, qty: item.qty - 1 }]
            : []
          : [item],
      ),
    );
  const clear = () => setItems([]);
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  const value = { items, addItem, removeItem, decreaseItem, clear, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

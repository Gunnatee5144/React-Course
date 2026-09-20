import { Routes, Route, NavLink } from 'react-router-dom'
import ShopPage from './components/ShopPage.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductList from './components/ProductList.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import { products } from './data/products.js'

const linkClass = ({ isActive }) =>
  isActive ? "font-bold text-blue-600" : "text-gray-600"

function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <nav className="flex gap-4 mb-6 pb-3 border-b">
        <NavLink to="/" end className={linkClass}>ร้านค้า</NavLink>
        <NavLink to="/perf" className={linkClass}>memo demo</NavLink>
        <NavLink to="/checkout" className={linkClass}>ชำระเงิน</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <ShopPage />
            <CartDrawer />
          </>
        } />
        <Route path="/perf" element={<ProductList products={products} />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </div>
  )
}
export default App

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import BookingPage from './components/BookingPage.jsx'
import Summary from './pages/Summary.jsx'
import Confirm from './pages/Confirm.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl p-6">
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </main>
    </>
  )
}
export default App

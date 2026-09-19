import Home from './pages/Home.jsx'
import Layout from './components/Layout.jsx'
import NotFound from './pages/NotFound.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Recipes from './pages/Recipes.jsx'
import About from './pages/About.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App

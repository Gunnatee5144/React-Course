// ข้อ 2: Routes — layout route ครอบ / /pokemon /pokemon/:nameOrId /team *
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'
import Team from './pages/Team'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:nameOrId" element={<PokemonDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

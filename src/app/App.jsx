import { Routes, Route, Navigate } from "react-router-dom"
import MapPage from "../pages/MapPage"
import FavoritesPage from "../pages/FavoritesPage"
import Layout from "../components/Layout"
function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/map" replace />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/map" replace />} />

    </Routes>
  )
}

export default App

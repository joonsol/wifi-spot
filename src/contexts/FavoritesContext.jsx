import { createContext,useContext } from "react";
import useFavorites from '../hooks/useFavorites'
const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const value = useFavorites()

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const ctx = useContext(FavoritesContext)

  if (!ctx) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider')
  }

  return ctx
}
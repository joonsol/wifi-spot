import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = 'wifi-spot-favorites'

const getStoredFavorites = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

const isSameSpot = (a, b) =>
    a?.name === b?.name &&
    a?.lat === b?.lat &&
    a?.lng === b?.lng


const useFavorites = () => {
    const [favorites, setFavorites] = useState(getStoredFavorites)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }, [favorites])

    const add = useCallback((spot) => {
        setFavorites((prev) => {
            if (prev.some((f) => isSameSpot(f, spot))) return prev
            return [...prev, spot]
        })
    }, [])

    const remove = useCallback((spot) => {
        setFavorites((prev) =>
            prev.filter((f) => !isSameSpot(f, spot))
        )
    }, [])

    const toggle = useCallback((spot) => {
        setFavorites((prev) => {
            const exists = prev.some((f) => isSameSpot(f, spot))
            if (exists) {
                return prev.filter((f) => !isSameSpot(f, spot))
            }
            return [...prev, spot]
        })
    }, [])

    const isFavorite = useCallback((spot) =>
        favorites.some((f) => isSameSpot(f, spot))
        , [favorites])


          return { favorites, add, remove, toggle, isFavorite }
}

export default useFavorites
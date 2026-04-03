import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesContext } from '../contexts/FavoritesContext'
const FavoritesPage = () => {

  const { favorites, remove } = useFavoritesContext()

  return (
    <div className='rounded-2xl border bg-white p-6 shadow-sm my-3  max-w-7xl mx-auto' >
      <h1 className="text-lg font-semibold">Favorites</h1>
      <p className="mt-2 text-sm text-slate-600">
        {favorites.length > 0
          ? `총 ${favorites.length}개의 즐겨찾기`
          : '즐겨찾기한 장소가 없습니다. Map에서 하트를 클릭해 추가하세요.'}
      </p>
      {favorites.length > 0 && (
        <ul className="mt-4 space-y-2 max-h-[60vh] overflow-auto">
          {favorites.map((item, idx) => (
            <li key={`${item.name}-${item.lat}-${item.lng}-${idx}`}>
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
              <div className="mt-1 text-xs text-slate-500">{item.phone}</div>

              <Link
                to="/map"
                state={{ selectedSpot: item }}
                className="text-xs text-slate-600 hover:text-slate-900 underline"
              >
                지도 보기
              </Link>
              <button
                onClick={() => remove(item)}
                className="text-lg cursor-pointer select-none"
                aria-label="즐겨찾기 제거"
              >
                ❤
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoritesPage
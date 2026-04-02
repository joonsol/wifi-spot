import React, { useState, useMemo ,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import wifiData from '../assets/wifi.json'
import MapView from '../components/MapView'
const MapPage = () => {
  const [q, setQ] = useState('')
  const [selectedSpot, setSelectedSpot] = useState(null)
  const { state } = useLocation()

  useEffect(() => {
    if (state?.selectedSpot) {
      setSelectedSpot(state.selectedSpot)
    }
  }, [state?.selectedSpot])

  const filtered = useMemo(() => {
    const keyword = q.trim()
    if (!keyword) return wifiData.slice(0, 50)

    return wifiData.
      filter((x) => (
        x.name + "" + x.detail
      ).toLowerCase().includes(keyword.toLowerCase())).slice(0, 50)
  }, [q])

  const isSameSpot = (a, b) =>
    a?.name === b?.name &&
    a?.lat === b?.lat &&
    a?.lng === b?.lng


  const spotsToShow = useMemo(() => {
    if (!selectedSpot) return filtered

    if (filtered.some((f) => isSameSpot(f, selectedSpot))) {
      return filtered
    }

    return [selectedSpot, ...filtered]

  }, [filtered, selectedSpot])
  return (
    <div className='grid gap-4 lg:grid-cols-[1.4fr_0.6fr]  max-w-7xl mx-auto my-3'>
      {/* 지도영역 */}
      <section className='overflow-hidden rounded-2xl border bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b px-4 py-3'>
          <h1 className='text-base font-semibold'>Map</h1>
          <p className='text-xs text-slate-500'>내 주변 공공 와이파이</p>
        </div>
        <div className='h-[70vh] bg-slate-100'>
          <MapView
            selectedSpot={selectedSpot}
            spots={spotsToShow} />
        </div>
      </section>
      {/* 리스트영역 */}
      <aside className='rounded-2xl border bg-white shadow-sm'>
        <div className='border-b px-4 py-3'>
          <h2 className='text-base font-semibold'>Wifi Spot</h2>
          <p className='mt-1 text-xs text-slate-500'>검색필터 목록 구성</p>
        </div>
        <div className='flex gap-2 border-b px-4 py-3'>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className='flex-3 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20'
            type="text" placeholder='장소 주소 검색' />
        </div>
        {/* 목록 더미 */}
        <ul className='max-h-[60vh] overflow-auto p-2'>
          {filtered.map((item, idx) => (
            <li
              key={idx}
               onClick={() => setSelectedSpot(item)}
              className='rounded-xl p-3 hover:bg-slate-50 cursor-pointer'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='text-sm font-semibold'>{item.name}</div>
                  <div className='mt-1 text-xs text-slate-500'>{item.detail}</div>
                </div>
                <div className='rounded-full bg-slate-100 px-2 text-xs text-slate-600'>{item.phone}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default MapPage
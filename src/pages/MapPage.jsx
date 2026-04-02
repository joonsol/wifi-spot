import React from 'react'

const MapPage = () => {
  return (
    <div className='grid gap-4 lg:grid-cols-[1.4fr_0.6fr]  max-w-7xl mx-auto my-3'>
      {/* 지도영역 */}
      <section className='overflow-hidden rounded-2xl border bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b px-4 py-3'>
          <h1 className='text-base font-semibold'>Map</h1>
          <p className='text-xs text-slate-500'>내 주변 공공 와이파이</p>
        </div>
        <div className='h-[70vh] bg-slate-100'>
          지도 들어갈 영역
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
            className='flex-3 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20'
            type="text" placeholder='장소 주소 검색' />
          <button className='rounded-lg bg-slate-900 text-sm text-white flex-1'>검색</button>
        </div>
        {/* 목록 더미 */}
        <ul className='max-h-[60vh] overflow-auto p-2'>
          {Array.from({ length: 15 }).map((_, idx) => (
            <li
              key={idx}
              className='rounded-xl p-3 hover:bg-slate-50 cursor-pointer'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='text-sm font-semibold'>Public Wifi Spot #{idx + 1}</div>
                  <div className='mt-1 text-xs text-slate-500'>서울시 어딘가 주소 예시</div>
                </div>
                <div className='rounded-full bg-slate-100 px-2 text-xs text-slate-600'>0.{idx}km</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default MapPage
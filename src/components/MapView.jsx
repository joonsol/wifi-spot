import React, { useEffect, useRef, useState } from 'react'
import useKakaoLoader from '../hooks/useKakaoLoader'
const MapView = ({ selectedSpot, spots = [] }) => {

    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const markersRef = useRef([])
    const infoRef = useRef(null)
    //  추가
    const [mapReady, setMapReady] = useState(false)
    const { ready } = useKakaoLoader()

    useEffect(() => {
        if (!ready) return
        if (mapInstanceRef.current) return
        if (!mapRef.current) return

        window.kakao.maps.load(() => {
            const center = new window.kakao.maps.LatLng(37.5665, 126.978)

            const map = new window.kakao.maps.Map(mapRef.current, {
                center,
                level: 5
            })

            mapInstanceRef.current = map;

            infoRef.current = new window.kakao.maps.InfoWindow({
                zIndex: 10,
                removable: true
            })
            // 추가
            setMapReady(true)
        })
    }, [ready])


    useEffect(() => {
        if (!ready || !mapInstanceRef.current || !window.kakao?.maps) return

        const map = mapInstanceRef.current

        markersRef.current.forEach((m) => m.setMap(null))
        markersRef.current = []

        if (!spots.length) return

        spots.forEach((spot) => {
            if (!spot.lat || !spot.lng) return

            const position = new window.kakao.maps.LatLng(
                Number(spot.lat),
                Number(spot.lng)
            )
            const marker = new window.kakao.maps.Marker({
                position,
                map
            })

            marker.spot = spot
            markersRef.current.push(marker)
            window.kakao.maps.event.addListener(marker, 'click', () => {
                if (infoRef.current) {
                    infoRef.current.setContent(`
                    <div class="p-2 min-w-[160px]">
                        <div class="font-semibold text-sm">
                            ${spot.name}
                        </div>
                        <div class="text-xs text-slate-500 mt-1">
                            ${spot.detail || '-'}
                        </div>
                        <div class="text-xs text-slate-500">
                            ${spot.phone || '-'}
                        </div>
                    </div>
                `)
                    infoRef.current.open(map, marker)
                }
            })

        })
        // mapReady 추가
    }, [ready, mapReady, spots])

    useEffect(() => {
        if (!ready || !mapReady ||!selectedSpot || !mapInstanceRef.current || !window.kakao?.maps) return

        const map = mapInstanceRef.current

        const { lat, lng } = selectedSpot

        if (!lat || !lng) return

        const position = new window.kakao.maps.LatLng(
            Number(lat),
            Number(lng)
        )

        map.setCenter(position)
        map.setLevel(3)

    }, [ready,mapReady,selectedSpot])

    return <div ref={mapRef} className='w-full h-full' />
}

export default MapView
import React ,{useEffect,useRef}from 'react'
import useKakaoLoader from '../hooks/useKakaoLoader'
const MapView = () => {

    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)

    const markerRef =useRef([])
    const infoRef = useRef(null)

    const {ready}= useKakaoLoader()


    useEffect(()=>{
        if(!ready) return
        if(mapInstanceRef.current) return
        if(!mapRef.current) return

        window.kakao.maps.load(()=>{
            const center = new window.kakao.maps.LatLng(37.5665, 126.978)

            const map = new window.kakao.maps.Map(mapRef.current,{
                center,
                level:5 
            })

            mapInstanceRef.current =map ;

            infoRef.current = new window.kakao.maps.InfoWindow({
                zIndex:10,
                removable:true
            })
        })
    },[ready])
  return <div ref={mapRef} className='w-full h-full' />
}

export default MapView
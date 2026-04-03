import { useState, useEffect } from "react";

let kakaoPromise;

const useKakaoLoader=()=>{
    const [ready, setReady]=useState(!!window.kakao?.maps)
    const [error, setError]=useState(null)

    useEffect(()=>{
        if(window.kakao?.maps){
            setReady(true)
            return
        }

        const key = import.meta.env.VITE_KAKAO_APP_KEY

        if(!key){
            setError(new Error("VITE_KAKAO_APP_KEY 없음"))
            return
        }

        if(!kakaoPromise){
            kakaoPromise=new Promise((resolve, reject)=>{
                const existing = document.querySelector(
                      `script[data-kakao-sdk="true"]`
                )

                if(existing){
                    existing.addEventListener('load',()=>resolve(window.kakao))

                    existing.addEventListener('error',()=>{
                        reject(new Error('kakao sdk 로드 실패'))
                    })
                    return
                }
                const script = document.createElement('script')
                script.dataset.kakaoSdk = 'true'
                script.async=true

                script.src=
                 `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`

                 script.onload = ()=> resolve(window.kakao)
                 script.onerror =()=>reject(new Error('kakao sdk load 실패'))

                 document.head.appendChild(script)
            })
        }

        kakaoPromise
        .then(()=>setReady(true))
        .catch((e)=>setError(e))
    },[])

    return {ready,error}
}

export default useKakaoLoader
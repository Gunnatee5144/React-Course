// R1: custom fetch hook ใช้ทุกจุดที่ต้อง fetch
// - เช็ก res.ok (PokeAPI คืน 404 จริงเมื่อไม่พบ)
// - cleanup กัน response เก่ามาทับ response ใหม่ (ignore flag + AbortController)
// - รองรับ url = null แปลว่าไม่ต้องยิง
import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) {
      setData(null)
      setLoading(false)
      setError(null)
      return
    }

    let ignore = false
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!ignore) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!ignore && err.name !== 'AbortError') {
          setData(null)
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}

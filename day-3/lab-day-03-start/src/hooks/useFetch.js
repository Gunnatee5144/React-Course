import { useCallback, useEffect, useRef, useState } from 'react'

function messageForStatus(status) {
  if (status === 404) return 'ไม่พบข้อมูล (404)'
  if (status === 403) return 'ถูกจำกัดการเรียก API ชั่วคราว (403 rate limit) — ลองใหม่อีกครั้งภายหลัง'
  return `เกิดข้อผิดพลาด (${status})`
}

export function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reloadIndex, setReloadIndex] = useState(0)

  const optionsRef = useRef(options)
  optionsRef.current = options

  const refetch = useCallback(() => setReloadIndex((n) => n + 1), [])

  useEffect(() => {
    if (!url) {
      setData(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(url, { ...optionsRef.current, signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(messageForStatus(res.status))
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled || err.name === 'AbortError') return
        setError(err.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ')
        setLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [url, reloadIndex])

  return { data, loading, error, refetch }
}

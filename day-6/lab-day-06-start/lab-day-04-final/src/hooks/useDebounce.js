import { useEffect, useState } from 'react'

export function useDebounce(value, delayMs = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)   // ★ ยกเลิก timer เก่าทุกครั้งที่ value เปลี่ยนก่อนครบเวลา
  }, [value, delayMs])
  return debounced
}

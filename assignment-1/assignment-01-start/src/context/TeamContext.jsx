// R4, R5: TeamProvider + useTeam() — ทางเข้าเดียวของ TeamContext
// - สูงสุด 6 ตัว, ห้ามซ้ำ, immutable update
// - count / isFull / has คำนวณตอน render ไม่เก็บเป็น state แยก
// - เก็บทีมใน localStorage, JSON เสีย -> ทีมว่าง ไม่ขาว
import { createContext, useContext, useEffect, useState } from 'react'

const TeamContext = createContext(null)

const STORAGE_KEY = 'pokedex-team'
const MAX_TEAM_SIZE = 6

function loadTeam() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((p) => p && typeof p.id === 'number' && typeof p.name === 'string')
  } catch {
    return []
  }
}

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(loadTeam)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
    } catch {
      // localStorage ใช้ไม่ได้ (เช่น private mode เต็ม) — ปล่อยผ่าน ไม่ทำแอปพัง
    }
  }, [team])

  const count = team.length
  const isFull = count >= MAX_TEAM_SIZE
  const has = (id) => team.some((p) => p.id === id)

  function addMember(pokemon) {
    setTeam((prev) => {
      if (prev.length >= MAX_TEAM_SIZE) return prev
      if (prev.some((p) => p.id === pokemon.id)) return prev
      return [...prev, pokemon]
    })
  }

  function removeMember(id) {
    setTeam((prev) => prev.filter((p) => p.id !== id))
  }

  function clearTeam() {
    setTeam([])
  }

  const value = { team, count, isFull, has, addMember, removeMember, clearTeam, maxSize: MAX_TEAM_SIZE }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}

// จุดเดียวในโปรเจกต์ที่เรียก useContext(TeamContext)
export function useTeam() {
  const ctx = useContext(TeamContext)
  if (!ctx) {
    throw new Error('useTeam() ต้องถูกเรียกภายใน <TeamProvider> เท่านั้น — ครอบ App ด้วย TeamProvider ใน main.jsx')
  }
  return ctx
}

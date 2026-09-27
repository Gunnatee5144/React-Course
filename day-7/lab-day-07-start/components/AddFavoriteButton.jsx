"use client"

import { useState } from "react"

export default function AddFavoriteButton({ mealId, name, thumb }) {
  const [status, setStatus] = useState("idle")   // idle | saving | saved | already | error
  const [errorMessage, setErrorMessage] = useState("")

  async function handleClick() {
    setStatus("saving")
    setErrorMessage("")

    const res = await fetch("/api/my-recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mealId, name, thumb }),
    })

    if (res.status === 201) {
      setStatus("saved")
      return
    }

    const data = await res.json()

    if (res.status === 409) {
      setStatus("already")
      setErrorMessage(data.error)
      return
    }

    setStatus("error")
    setErrorMessage(data.error)
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleClick}
        disabled={status === "saving" || status === "saved" || status === "already"}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
      >
        {status === "saving" ? "กำลังบันทึก..." : status === "saved" ? "บันทึกแล้ว ✓" : "เพิ่มในสูตรโปรด"}
      </button>
      {status === "already" && <p className="text-sm text-gray-500 mt-1">{errorMessage}</p>}
      {status === "error" && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  )
}

// ฟังก์ชันล้วน ไม่ใช่ component (import ได้ทั้งจาก Server และ Client)
// TheMealDB เก็บส่วนผสมเป็น strIngredient1..20 + strMeasure1..20 — รวบเป็น array [{ name, measure }]
// แล้วตัดช่องว่าง/ค่าว่างทิ้ง (ตรรกะเดียวกับวันที่ 4)
export function getIngredients(meal) {
  return Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      name: meal[`strIngredient${i}`],
      measure: meal[`strMeasure${i}`],
    }))
    .filter((x) => x.name && x.name.trim())
}

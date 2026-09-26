function About() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">เกี่ยวกับ</h1>
      <p className="text-gray-600">
        แอปนี้จัดทำเพื่อฝึก React Router — ข้อมูลสูตรอาหารทั้งหมดมาจาก
        {' '}<a href="https://www.themealdb.com" target="_blank" rel="noreferrer" className="underline">TheMealDB</a>
      </p>
    </div>
  )
}
export default About

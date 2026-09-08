// แยก object ขนาดและสี ทำให้เพิ่มตัวเลือกใหม่ได้โดยไม่แก้โครง JSX
const sizes = {
  sm: 'h-10 w-10 text-base',
  md: 'h-12 w-12 text-[19px]',
  lg: 'h-16 w-16 text-[25px]',
}

const colors = {
  blue: 'bg-blue-600',
  purple: 'bg-violet-600',
  emerald: 'bg-emerald-600',
}

function Avatar({ name, size = 'md', color = 'blue' }) {
  const initial = name.trim().charAt(0).toUpperCase()

  return (
    <div
      className={`${sizes[size]} ${colors[color]} flex shrink-0 items-center justify-center rounded-full font-bold text-white`}
    >
      {initial}
    </div>
  )
}

export default Avatar

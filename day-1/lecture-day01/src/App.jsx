import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ProfileCard from './components/profilecard'
import { users } from './constant/users'

function App() {
  const [count, setCount] = useState(0)
  const name = "Guntee Wareesaart";
  const age = 25;

  return (
    <>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            name={user.name}
            role={user.role}
            department={user.department}
            isOnline={user.isOnline}
          />
        ))}
      </div>
      
    </>
  )
}

export default App

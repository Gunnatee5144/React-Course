import { users } from './data/users.js'
import Layout from './components/Layout.jsx'
import ProfileCard from './components/ProfileCard.jsx'

function App() {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {users.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </Layout>
  )
}

export default App

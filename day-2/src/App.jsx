import Counter from './components/Counter';
import ProfileCard from './components/profilecard';
import TipCalc from './TipCalc';
import TodoList from './components/TodoList';

function App() {
  console.log("App")

  return (
    <div className="flex flex-col">
      <div className="p-8 grid grid-cols-3 gap-4">
        <ProfileCard name="John Doe" role="Software Engineer" />
        <Counter />
        <TipCalc />
        <TodoList />
      </div>
    </div>
  )
}

export default App;

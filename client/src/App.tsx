import './App.css';
import { AppBar } from './AppBar';
import { useAppStateContext } from './AppState';
import { HomePage } from './HomePage';

function App() {

  const { loggedUser } = useAppStateContext();
  return (
    <div>
      <AppBar />
      {!loggedUser && <>
        <div className='bg-gray-300'>
          <h2>Neto Social</h2>
          <div>Facebook and VK killer</div>
        </div>
      </>}
      {loggedUser && <HomePage />}
    </div>
  )
}

export default App

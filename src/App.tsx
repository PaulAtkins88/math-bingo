import 'bootstrap/dist/css/bootstrap.min.css';
import { Game } from './Game';

function App() {
  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center' }}>Maths Bingo</h1>
      <Game key={0} cols={3} rows={3} dice={2} players={2} />
    </div>
  );
}

export default App;

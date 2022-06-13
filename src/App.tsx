import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import About from './components/about/About';
import { Game } from './components/game/Game';
import GameSetup from './components/game/GameSetup';
import GameSetupModel from './models/GameSetup.model';

function App() {
  const [setupDone, setSetupDone] = useState(false);
  const [gameSetup, setGameSetup] = useState<GameSetupModel>({
    // default values
    players: 2,
    rows: 3,
    cols: 3,
    dice: 2,
  });

  const handleSubmit = (gameSetup: GameSetupModel) => {
    setGameSetup(gameSetup);
    setSetupDone(true);
  };

  const handleReset = () => {
    setSetupDone(false);
  };

  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center' }}>Maths Bingo</h1>

      {!setupDone ? (
        <>
          <About />
          <GameSetup gameSetup={gameSetup} onSubmit={handleSubmit} />
        </>
      ) : (
        <Game gameSetup={gameSetup} handleReset={handleReset} />
      )}
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserGrid } from './components/UserGrid';
import { Col, Container, Row } from 'react-bootstrap';
import { Die } from './components/Die';
import { Dice } from './components/Dice';
import { useState } from 'react';

function App() {
  // keep track of the values returned from the dice
  const [diceValues, setDiceValues] = useState(Array().fill(0));
  // keep track of the number of dice
  const [dice, setDice] = useState(2);
  // keep track of the number of rows
  const [rows, setRows] = useState(3);
  // keep track of the number of columns
  const [cols, setCols] = useState(3);
  // keep track of the heading
  const [heading, setHeading] = useState(['Player 1', 'Player 2']);

  const onDiceRoll = (value: number) => {
    setDiceValues([...diceValues, value]);
  };

  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center' }}>Maths Bingo</h1>
      <Container>
        <Row>
          <Col>
            <UserGrid
              heading={heading[0]}
              rows={3}
              cols={3}
              diceValues={diceValues}
              player={1}
            />
          </Col>
          <Col>
            <UserGrid
              heading={heading[1]}
              rows={3}
              cols={3}
              diceValues={diceValues}
              player={2}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Dice
              dice={dice}
              onChange={(value: number) => onDiceRoll(value)}
              value={0}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

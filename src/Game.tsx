import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Dice } from './components/Dice';
import { UserGrid } from './components/UserGrid';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import DiceSet from './components/DiceSet';

interface GameProps {
  rows: number;
  cols: number;
  dice: number;
  players: number;
}

export const Game = (props: GameProps) => {
  // keep track of the values returned from the dice
  const [diceValues, setDiceValues] = useState(Array().fill(0));
  // keep track of the number of dice
  const [dice, setDice] = useState(props.dice);
  // keep track of the number of rows
  const [rows, setRows] = useState(props.rows);
  // keep track of the number of columns
  const [cols, setCols] = useState(props.cols);
  // keep track of the heading

  const userGrids: JSX.Element[] = [];
  for (let i = 0; i < props.players; i++) {
    userGrids.push(
      <Col>
        <UserGrid
          key={i}
          rows={rows}
          cols={cols}
          heading={`Player ${i + 1}`}
          diceValues={diceValues}
          player={i}
        />
      </Col>
    );
  }

  const onDiceRoll = (value: number) => {
    setDiceValues([...diceValues, value]);
    console.log(diceValues);
  };

  return (
    <Container key={'test'}>
      <Row>{userGrids}</Row>
      <Row>
        <Col>
          {/* <Dice
            dice={dice}
            onChange={(value: number) => onDiceRoll(value)}
            value={0} 
          /> */}  

          {/* <ReactDice
            numDice={dice}
            rollDone={(value: number) => onDiceRoll(value)}
          /> */}
          
          {/* Adding in the class */}
          <DiceSet /> 
          
        </Col>
      </Row>
    </Container>
  );
};

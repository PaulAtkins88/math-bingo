import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import GameSetupModel from '../../models/GameSetup.model';
import { Dice } from './Dice';
import { UserGrid } from './UserGrid';

interface GameProps {
  gameSetup: GameSetupModel;
  handleReset: () => void;
  handleWin: (player: number) => void;
}

export const Game = (props: GameProps) => {
  const { gameSetup, handleWin } = props;
  const { players, rows, cols, dice } = gameSetup;

  // keep track of the values returned from the dice
  const [diceValues, setDiceValues] = useState(Array().fill(0));

  const userGrids: JSX.Element[] = [];
  for (let i = 0; i < players; i++) {
    userGrids.push(
      <Col>
        <UserGrid
          key={i}
          rows={rows}
          cols={cols}
          heading={`Player ${i + 1}`}
          diceValues={diceValues}
          player={i}
          totalDice={dice}
          handleWin={handleWin}
        />
      </Col>
    );
  }

  const onDiceRoll = (value: number) => {
    setDiceValues([...diceValues, value]);
  };

  const handleReset = () => {
    setDiceValues(Array().fill(0));
    props.handleReset();
  };

  return (
    <Container>
      <Row>{userGrids}</Row>
      <Row>
        <Col>
          <Dice
            dice={dice}
            onChange={(value: number) => onDiceRoll(value)}
            value={0}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
    </Container>
  );
};

import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import GameSetupModel from "../../models/GameSetup.model";
import { Dice } from "./Dice";
import { UserGrid } from "./UserGrid";

interface GameProps {
  gameSetup: GameSetupModel;
  handleReset: () => void;
  handleWin: (player: number) => void;
}

export const Game = (props: GameProps) => {
  const { gameSetup, handleWin } = props;
  const { players, rows, cols, dice } = gameSetup;

  // keep track of the values returned from the dice
  const [diceValues, setDiceValues] = useState([] as number[]);

  const userGrids: JSX.Element[] = [];
  let tabIndexCounter = 1;
  for (let i = 0; i < players; i++) {
    userGrids.push(
      <Col key={`col-${i}`} sm={4}>
        <UserGrid
          key={`user-grid-${i}`}
          rows={rows}
          cols={cols}
          heading={`Player ${i + 1}`}
          diceValues={diceValues}
          player={i}
          totalDice={dice}
          handleWin={handleWin}
          tabIndexCounter={tabIndexCounter++}
        />
      </Col>
    );
  }

  const onDiceRoll = (value: number) => {
    setDiceValues([...diceValues, value]);
  };

  const handleReset = () => {
    setDiceValues([]);
    props.handleReset();
  };

  return (
    <Container fluid="sm">
      <Row className="justify-content-center">{userGrids}</Row>
      <Row>
        <Col>
          <Dice
            dice={dice}
            onChange={(value: number) => onDiceRoll(value)}
            value={0}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={1}>
          <Button onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
    </Container>
  );
};

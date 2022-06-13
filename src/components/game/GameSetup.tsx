// this component will be used to display the game setup
// it is repsonsible for asking the user for the number of players,
// the number of rows and columns for each player,
// and the number of dice to be used in the game
// it will then pass these values to back to the app component to be used in the game component

import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import GameSetupModel from '../../models/GameSetup.model';

interface GameSetupProps {
  gameSetup: GameSetupModel;
  onSubmit: (gameSetup: GameSetupModel) => void;
}

const GameSetup = (props: GameSetupProps) => {
  const { gameSetup, onSubmit } = props;
  // keep track of the number of players
  const [players, setPlayers] = useState(2);
  // keep track of the number of rows
  const [rows, setRows] = useState(3);
  // keep track of the number of columns
  const [cols, setCols] = useState(3);
  // keep track of the number of dice
  const [dice, setDice] = useState(2);

  // handle the form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // pass the game setup to the app component
    // this will be used to create the game
    gameSetup.players = players;
    gameSetup.rows = rows;
    gameSetup.cols = cols;
    gameSetup.dice = dice;

    // pass the game setup to the app component
    onSubmit(gameSetup);
  };

  const handleReset = () => {
    setPlayers(2);
    setRows(3);
    setCols(3);
    setDice(2);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className='text-center'>Game Setup</h1>
        </Col>
      </Row>
      <Form onSubmit={handleFormSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='players'>
            <Form.Label>Players</Form.Label>
            <Form.Control
              type='number'
              value={players}
              onChange={(e) => setPlayers(Number(e.target.value))}
              placeholder='Number of Players'
            />
          </Form.Group>

          <Form.Group as={Col} controlId='rows'>
            <Form.Label>Rows</Form.Label>
            <Form.Control
              type='number'
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              placeholder='Number of Rows'
            />
          </Form.Group>

          <Form.Group as={Col} controlId='cols'>
            <Form.Label>Columns</Form.Label>
            <Form.Control
              type='number'
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              placeholder='Number of Columns'
            />
          </Form.Group>

          <Form.Group as={Col} controlId='dice'>
            <Form.Label>Dice</Form.Label>
            <Form.Control
              type='number'
              value={dice}
              onChange={(e) => setDice(Number(e.target.value))}
              placeholder='Number of Dice'
            />
          </Form.Group>
        </Row>
        {/* Start game button and reset button centered on page with even spacing */}
        <Row className='justify-content-center'>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Button type='submit' className='w-100' variant='primary' size='lg'>
              Start Game
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Button
              type='button'
              className='w-100'
              variant='secondary'
              size='lg'
              onClick={handleReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default GameSetup;

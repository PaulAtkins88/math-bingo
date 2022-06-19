import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const diceButton = {
  fontSize: 75,
  height: 120,
  width: 120,
  backgroundColor: 'transparent',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  outline: 'none',
};

interface DiceProps {
  dice: number;
  value: number;
  onChange: (value: number) => void;
}

export const Dice = (props: DiceProps) => {
  const { dice, value, onChange } = props;
  const [newValue, setNewValue] = useState(value);
  // create state using a number array
  const [diceValues, setDiceValues] = useState(Array(dice).fill(0));

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleClick = () => {
    // roll all the dice and get the value
    const newDiceValues: number[] = [];

    for (let i = 0; i < dice; i++) {
      newDiceValues.push(Math.floor(Math.random() * 6) + 1);
    }
    setDiceValues(newDiceValues);
    // get the sum of the dice
    const newValue = newDiceValues.reduce((acc, curr) => acc + curr, 0);
    setNewValue(newValue);

    // call the onChange method
    onChange(newValue);
  };

  return (
    <div className='d-flex justify-content-center text-center'>
      <Col sm={5} className='d-flex m-2 justify-content-center'>
        {/* show all the dice */}
        {diceValues.map((value, index) => {
          return (
            <button
              className={`bi bi-dice-${value || 1}`}
              style={diceButton}
              key={index}
              onClick={handleClick}
            ></button>
          );
        })}
      </Col>
    </div>
  );
};

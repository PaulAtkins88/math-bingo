// this component will handle the dice value for the game
// it can have 1 or more die
// it keeps track of the value of each die and uses the method specified to get the value of the die combined
// it can be used to get the value of a single die or all dice

import { useEffect, useState } from 'react';

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
    <div>
      <button onClick={handleClick}>Roll</button>
      {/* show all the dice */}
      {diceValues.map((value, index) => {
        return (
          <p key={index}>
            Dice {index + 1}: {value}
          </p>
        );
      })}
      <p>Total: {newValue}</p>
    </div>
  );
};

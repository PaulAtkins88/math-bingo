import { useEffect, useState } from 'react';

// a dice that can be rolled
interface DieProps {
  value: number;
  die: number;
}

export const Die = (props: DieProps) => {
  // a die has a value and a roll button
  // when a user clicks the roll button, the value of the die is randomly generated between 1 and 6
  const { value } = props;
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleClick = () => {
    setNewValue(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Roll</button>
      <p>{newValue}</p>
    </div>
  );
};

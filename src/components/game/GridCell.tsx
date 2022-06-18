import React, { useEffect, useRef, useState } from "react";

// an editable grid cell for placing a number in a grid
export interface GridCellProps {
  cellKey: string;
  cellValue: number;
  diceValues: number[];
  highlight: boolean;
  position: string;
  totalDice: number;
  tabIndex: number;
  updateHighlight: (highlight: boolean, position: string) => void;
}

export const GridCell = (props: GridCellProps) => {
  const {
    cellKey,
    cellValue,
    diceValues,
    position,
    totalDice,
    tabIndex,
    updateHighlight,
  } = props;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(cellValue);
  const [highlighted, setHighlighted] = useState(false);

  const cellInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (diceValues.includes(value)) {
      setHighlighted(true);
      updateHighlight(true, position);
    }
    if (editing && cellInput.current) {
      cellInput.current.select();
    }
  }, [diceValues, value, cellInput, editing, position, updateHighlight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape" || e.key === "Tab") {
      setEditing(false);
    }
  };

  const handleClick = () => {
    setEditing(true);
  };

  return (
    <>
      <td
        key={`cell-${cellKey}`}
        onClick={handleClick}
        tabIndex={tabIndex}
        onFocus={handleClick}
        style={{ height: 100, width: 100, fontSize: 50, textAlign: "center" }}
      >
        {editing ? (
          <input
            ref={cellInput}
            id={`input-${cellKey}`}
            type="number"
            onChange={handleChange}
            value={value}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={{ width: "100%", textAlign: "center" }}
            min={totalDice}
            max={totalDice * 6}
          />
        ) : (
          <span
            id={`span-${cellKey}`}
            onClick={handleClick}
            onBlur={handleBlur}
            style={{
              width: "100%",
              textAlign: "center",
              cursor: "hand",
              justifyItems: "center",
              backgroundColor: highlighted ? "#ffc0cb" : "#ffffff",
            }}
          >
            {value}
          </span>
        )}
      </td>
    </>
  );
};

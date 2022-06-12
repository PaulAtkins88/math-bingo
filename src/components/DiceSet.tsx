import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";

export default class DiceSet extends React.Component {
  reactDice: any;
  // constructor(props: any) {
  //   super(props);
  //   // this.reactDice = this.reactDice.bind(this);
  // }
  render() {
    return (
      <div>
        <ReactDice
          numDice={2}
          rollDone={this.rollDoneCallback}
          ref={(dice: any) => (this.reactDice = dice)}
        />
        <button onClick={this.rollAll}>Roll All</button>
      </div>
    );
  }

  rollAll = () => {
    this.reactDice.rollAll();
  }

  rollDoneCallback(num: number) {
    console.log(`You rolled a ${num}`);
  }
}

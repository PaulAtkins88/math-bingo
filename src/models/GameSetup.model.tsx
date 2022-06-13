export default class GameSetupModel {
  players: number;
  rows: number;
  cols: number;
  dice: number;

  constructor(players: number, rows: number, cols: number, dice: number) {
    this.players = players;
    this.rows = rows;
    this.cols = cols;
    this.dice = dice;
  }
}

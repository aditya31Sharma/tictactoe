import React, { useState } from 'react';
import './styles/root.scss';
import Board from './components/Board'
import {calculateWinner} from './helpers'

const App = () => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setXNext] = useState(false);
  console.log(board);

  const winner =calculateWinner(board)
  const message= winner? `Winner is ${winner}` : ` Next player is: ${isXNext?'X':'O'}`

  const handleSquareClick = position => {
    if (board[position] || winner) {
      return;
    }
    setBoard(prevState => {
      return prevState.map((square, pos) => {
        if (pos === position) {
          return isXNext ? 'X' : 'O';
        }
        return square;
      });
    });
    setXNext(!isXNext);
  };

  return (
    <div className="app">
      <h1>TicTacToe</h1>
      <h2>{message}</h2>
      <Board board={board} handleSquareClick={handleSquareClick} />
    </div>
  );
};
export default App;

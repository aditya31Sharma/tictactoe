import React, { useState } from 'react';
import './styles/root.scss';
import Board from './components/Board';
import { calculateWinner } from './helpers';

const App = () => {
  // const [board, setBoard] = useState(Array(9).fill(null));
  // const [isXNext, setXNext] = useState(false);
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];
  console.log(history);

  const winner = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : ` Next player is: ${current.isXNext ? 'X' : 'O'}`;

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory(prevState => {
      const last = prevState[prevState.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prevState.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prevState=>prevState+1);
  };

  return (
    <div className="app">
      <h1>TicTacToe</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
    </div>
  );
};
export default App;

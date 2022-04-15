import React, { useState } from 'react';
import './styles/root.scss';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const winner = calculateWinner(current.board);
  

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
    setCurrentMove(prevState => prevState + 1);
  };
  const moveTo = move => {
    setCurrentMove(move);
  };
  return (
    <div className="app">
      <h1>TicTacToe</h1>
      {/* <h2>{message}</h2> */}
      <StatusMessage winner={winner} current={current}/>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
};
export default App;

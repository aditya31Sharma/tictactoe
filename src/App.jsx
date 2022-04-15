import React, { useState } from 'react';
import './styles/root.scss';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';

const NEW_GAME_SETTING = [{ board: Array(9).fill(null), isXNext: true }];
const App = () => {
  const [history, setHistory] = useState(NEW_GAME_SETTING);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const {winner,winningSquares} = calculateWinner(current.board);

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
  const onNewGame = () => {
    setHistory(NEW_GAME_SETTING);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <h1>TicTacToe</h1>
      <StatusMessage winner={winner} current={current} />
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares}/>
      <button type="button" onClick={onNewGame}>
        Start New Game
      </button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
};
export default App;

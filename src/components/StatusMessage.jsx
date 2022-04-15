import React from 'react';

const StatusMessage = ({ winner, current }) => {
  const noMovesLeft = current.board.every(el => el !== null);

  return (
    <div className="status-message">
      {winner && (
        <>
          Winner is:&nbsp; 
          <span
            className={winner === 'X' ? 'text-green' : 'text-orange'}
          >
            {winner}
          </span>
        </>
      )}
      {!winner &&
        !noMovesLeft &&(
          <>
          Next player is:&nbsp; 
          <span
            className={current.isXNext? 'text-green' : 'text-orange'}
          >
            {current.isXNext? 'X' : 'O'}
          </span>
          </>
        )
        }
      {!winner && noMovesLeft && `Its a Draw`}
    </div>
  );
};

export default StatusMessage;

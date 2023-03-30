import { useState } from 'react';

function Square({ value, onSquareClick, shouldStyle }) {
  return (
    <button
      className={`square ${shouldStyle ? "winning-square" : ""}`}
      onClick={onSquareClick}>
      {value}
    </button>
  )
}


function Board({ isXNext, squares, onPlay }) {
  const winnerStyle = {}

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquare = squares.slice(0);
    if (isXNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    onPlay(nextSquare);
  }

  const Winner = calculateWinner(squares, winnerStyle);
  const isEverySqFilled = squares.every(e => e);
  let status;
  if (Winner) {
    status = `Winner: ${Winner}`;
  } else if (!Winner && isEverySqFilled) {
    status = "Draw! Go to Game Start"
  }
  else {
    status = "Next Player:" + ((isXNext) ? "X" : "O");
  }


  return (
    <>
      <p className="status">{status}</p>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} shouldStyle={winnerStyle[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} shouldStyle={winnerStyle[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} shouldStyle={winnerStyle[2]} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} shouldStyle={winnerStyle[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} shouldStyle={winnerStyle[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} shouldStyle={winnerStyle[5]} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} shouldStyle={winnerStyle[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} shouldStyle={winnerStyle[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} shouldStyle={winnerStyle[8]} />
      </div>
    </>
  )
}


function calculateWinner(squares, winnerStyle) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {     lines[i].forEach(e => (winnerStyle[e] = true))
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    let displayInDiv = false;
    if (move > 0 && move === currentMove) {
      description = `You're at #${move} Move`;
      displayInDiv = true;
    } else if (move > 0) {
      description = `Go to move #${move}`;
      displayInDiv = false;
    } else {
      description = `Go to Game Start`;
    }

    return (
      <>
        <li key={move}>
          {displayInDiv && <div> {description}</div>}
          {!displayInDiv && <button onClick={() => jumpTo(move)}>{description}</button>}
        </li>
      </>
    )
  })

  return (
    <>
      <div className='main-container'>
        <h1>Tic Tac Toe </h1>
        <div className='game'>
          <div className='game-board'>
            <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className='game-info'>
            <h2>Moves:</h2>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </>
  )
}
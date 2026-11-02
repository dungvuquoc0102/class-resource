import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const isXNext = (history.length + 1) % 2 === 0;
  const currentSquares = history[history.length - 1];

  const handleClick = (index) => {
    if (currentSquares[index] || caculateWinner(currentSquares)) return;
    const newSquares = [...currentSquares];
    if (isXNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    setHistory([...history, newSquares]);
  };

  const caculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = caculateWinner(currentSquares);

  const handleReturn = (step) => {
    setHistory(history.slice(0, step + 1));
  };

  return (
    <div className="min-h-300">
      <h1>GAME: TIC TAC TOE</h1>
      <div>Winner: {winner || "None"}</div>
      <div className="flex gap-3 items-start justify-center">
        <Board currentSquares={currentSquares} handleClick={handleClick} />
        <div>
          <h2>History</h2>
          <ul>
            {history.map((squares, index) => {
              const isCurrent = index === history.length - 1;
              return (
                <li key={index}>
                  <button onClick={() => handleReturn(index)}>
                    {isCurrent
                      ? "Bước: " +
                        index +
                        ` (${winner ? "Kết thúc" : "Hiện tại"}      )`
                      : "Bước: " + index}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

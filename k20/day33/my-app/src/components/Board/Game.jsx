import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const handleChange = (newSquares) => {
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setIsXNext(!isXNext);
    setCurrentMove(newHistory.length - 1);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button
          className={`border border-gray-300 rounded-md  p-3 hover:brightness-110 hover:cursor-pointer hover:-translate-y-0.5  ${move === currentMove ? "bg-green-300 font-bold" : "bg-orange-300"}`}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex gap-10">
      <Board
        currentSquares={currentSquares}
        isXNext={isXNext}
        onChange={handleChange}
      />
      <div>
        <ol className="mt-3 flex flex-col gap-2">{moves}</ol>
      </div>
    </div>
  );
}

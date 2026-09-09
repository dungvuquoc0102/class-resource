import Square from "./Square";

export default function Board({ currentSquares, isXNext, onChange }) {
  const handleClick = (i) => {
    if (currentSquares[i] || caculateWinner(currentSquares)) return;
    const newSquares = [...currentSquares];
    newSquares[i] = isXNext ? "X" : "O";
    onChange(newSquares);
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
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="">
      <div className="font-bold text-xl mb-2">{status}</div>
      <div className="flex">
        <Square value={currentSquares[0]} handleClick={() => handleClick(0)} />
        <Square value={currentSquares[1]} handleClick={() => handleClick(1)} />
        <Square value={currentSquares[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={currentSquares[3]} handleClick={() => handleClick(3)} />
        <Square value={currentSquares[4]} handleClick={() => handleClick(4)} />
        <Square value={currentSquares[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={currentSquares[6]} handleClick={() => handleClick(6)} />
        <Square value={currentSquares[7]} handleClick={() => handleClick(7)} />
        <Square value={currentSquares[8]} handleClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

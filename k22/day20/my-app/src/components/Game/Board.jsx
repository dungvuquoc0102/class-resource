import Square from "./Square";

export default function Board({ currentSquares, handleClick }) {
  return (
    <>
      <div className="grid grid-cols-[repeat(3,minmax(0,36px))] gap-0.5 mt-2 ">
        {currentSquares.map((value, index) => (
          <Square
            key={index}
            value={value}
            handleClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

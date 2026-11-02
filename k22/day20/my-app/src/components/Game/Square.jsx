export default function Square({ value, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="size-9 bg-blue-500 text-2xl text-white font-bold"
    >
      {value}
    </button>
  );
}

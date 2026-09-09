export default function Square({ value, handleClick }) {
  return (
    <button onClick={handleClick} className="border size-12 text-3xl font-bold">
      {value}
    </button>
  );
}

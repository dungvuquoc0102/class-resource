const MenuItem = ({ value }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* <h3 className="text-xl font-bold">{name}</h3> */}
      <p className="font-bold text-red-500">{value}</p>
    </div>
  );
};

export default MenuItem;

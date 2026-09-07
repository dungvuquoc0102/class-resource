import MenuItem from "./MenuItem";

const Menu = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-3 bg-yellow-100 p-3">
      {items.map((item, index) => {
        return <MenuItem key={index} value={Object.entries(item)[0][1]} />;
      })}
    </div>
  );
};

export default Menu;

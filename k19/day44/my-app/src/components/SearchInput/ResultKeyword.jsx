export const ResultKeyword = ({ title, keywords }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul>
        {keywords.map((keyword, index) => (
          <li
            key={index}
            className="rounded-sm text-sm items-center flex gap-2 hover:bg-gray-200 px-2 py-2 hover:cursor-pointer text-gray-500"
          >
            <i className="fa-solid fa-search"></i>
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
};

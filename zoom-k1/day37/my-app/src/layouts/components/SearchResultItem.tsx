import { memo } from "react";

export type SearchItemData = {
  id: string | number;
  image: string;
  title: string;
  description: string;
  badgeText: string;
};

export type SearchResultItemProps = {
  item: SearchItemData;
  onClick?: (item: SearchItemData) => void;
};

export const SearchResultItem = ({ item, onClick }: SearchResultItemProps) => {
  console.log("hello");

  return (
    <div
      className="p-3 flex items-center gap-2 hover:bg-orange-100 rounded-md hover:translate-x-1 transition-all hover:cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="size-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-bold">{item.title}</p>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
      <div>
        <span className="bg-blue-50 text-gray-600 rounded-full inline-block px-2 py-1 font-medium text-xs">
          {item.badgeText}
        </span>
      </div>
    </div>
  );
};

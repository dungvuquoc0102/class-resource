import { SearchResultItem, type SearchItemData } from "./SearchResultItem";

type SearchResultSectionProps = {
  title: string;
  items: SearchItemData[];
  onMoreClick?: () => void;
  onItemClick?: (item: SearchItemData) => void;
};

export const SearchResultSection = ({
  title,
  items,
  onMoreClick,
  onItemClick,
}: SearchResultSectionProps) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-sm text-gray-600 border-b border-gray-300 w-full pb-1">
          {title}
        </p>
        {onMoreClick && <button onClick={onMoreClick}>Xem thêm</button>}
      </div>
      <div className="mt-2">
        {items.map((item) => (
          <SearchResultItem key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
};

import { useCallback, useEffect, useState } from "react";
import { SearchResultSection } from "./SearchResultSection";
import type { SearchItemData } from "./SearchResultItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

const fakeData = {
  courses: [
    {
      id: 1,
      image: "https://picsum.photos/200",
      title: "Khóa học ReactJS",
      description: "Học ReactJS từ cơ bản đến nâng cao",
      badgeText: "Khóa học",
    },
    {
      id: 2,
      image: "https://picsum.photos/200",
      title: "Khóa học Next.js",
      description: "Học Next.js từ cơ bản đến nâng cao",
      badgeText: "Khóa học",
    },
    {
      id: 3,
      image: "https://picsum.photos/200",
      title: "Khóa học TypeScript",
      description: "Học TypeScript từ cơ bản đến nâng cao",
      badgeText: "Khóa học",
    },
  ],
  lessons: [
    {
      id: 4,
      image: "https://picsum.photos/200",
      title: "Setup dự án React với Shadcn UI",
      description: "Hướng dẫn setup dự án React với Shadcn UI",
      badgeText: "Bài học",
    },
  ],
  posts: [
    {
      id: 5,
      image: "https://picsum.photos/200",
      title: "Bài viết ReactJS",
      description: "Học ReactJS từ cơ bản đến nâng cao",
      badgeText: "Bài viết",
    },
  ],
};

export const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<{
    courses: SearchItemData[];
    lessons: SearchItemData[];
    posts: SearchItemData[];
  }>({
    courses: [],
    lessons: [],
    posts: [],
  });

  const fetchSearchResults = useCallback(
    async (signal: AbortSignal) => {
      if (!keyword.trim()) {
        setResults({
          courses: [],
          lessons: [],
          posts: [],
        });
        setIsLoading(true);
        return;
      }

      setIsLoading(true);
      try {
        // const tempRes = await fetch("https://jsonplaceholder.typicode.com/todos", { signal });
        const res: {
          courses: SearchItemData[];
          lessons: SearchItemData[];
          posts: SearchItemData[];
        } = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(fakeData);
          }, 700);
        });
        setResults(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [keyword],
  );

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchSearchResults(controller.signal);
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [keyword]);

  const handleItemClick = useCallback((item: SearchItemData) => {
    console.log("Clicked item:", item);
  }, []);

  return (
    <div className="min-w-md relative">
      <div className="flex items-center space-x-1 rounded-full border border-gray-300 px-5 py-2">
        <FontAwesomeIcon
          className="text-xl text-gray-500"
          icon={faMagnifyingGlass}
        />
        <input
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={keyword}
          type="text"
          placeholder="Tìm khóa học, bài tập, hỏi đáp..."
          className="border-0 outline-0 px-2 py-1 flex-1"
        />
      </div>
      <div
        className={
          "py-3 space-y-3 absolute bg-white shadow-2xl rounded-md mt-2 w-full z-10 px-6 " +
          (isFocused && keyword.trim() ? "block" : "hidden")
        }
      >
        {isLoading ? (
          <p>{"Tìm kiếm " + '"' + keyword + '"'}</p>
        ) : (
          <>
            <SearchResultSection
              title="Khóa học"
              items={results.courses}
              onItemClick={handleItemClick}
            />
            <SearchResultSection
              title="Bài học"
              items={results.lessons}
              onItemClick={handleItemClick}
            />
            <SearchResultSection
              title="Bài viết"
              items={results.posts}
              onItemClick={handleItemClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

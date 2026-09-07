import { useState } from "react";
import { SearchInputForm } from "./SearchInputForm";
import { SearchInputResult } from "./SearchInputResult";

const searchResult = {
  keywords: [
    // {
    //   title: "Từ khóa phổ biến",
    //   keywords: ["Trưởng phòng kinh doanh", "Trưởng phòng nhân sự"],
    // },
    {
      title: "Từ khóa gợi ý",
      keywords: [
        "fullstack developer",
        "fullstack",
        "lập trình viên developer",
      ],
    },
    {
      title: "Từ khóa liên quan",
      keywords: [
        "fullstack developer",
        "công nghệ thông tin",
        "thực tập sinh IT",
      ],
    },
  ],
  jobs: [
    {
      image_url:
        "https://cdn-new.topcv.vn/unsafe/300x/https://static.topcv.vn/company_logos/infiniq-vietnam-coltd-637c4eb722c79.jpg",
      title: "Fullstack Developer (C#, React/Next.Js) - Từ 2 Năm Kinh Nghiệm",
      companyName: "INFINIQ Vietnam Co.,ltd",
      salary: "Thoả thuận",
    },
    {
      image_url:
        "https://cdn-new.topcv.vn/unsafe/300x/https://static.topcv.vn/company_logos/nSIOcC9ocENDfRVDTaFonEYgJ4mIDqn0_1786012678____5c730cc2b724614cc829c2b5dcb0829d.png",
      title: "Fullstack Developer",
      companyName: "Công ty Cổ phần TOPCV Việt Nam",
      salary: "Thoả thuận",
    },
  ],
};
export const SearchInput = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <div>
      <div className="relative w-285">
        <SearchInputForm
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <SearchInputResult
          searchResult={searchResult}
          searchString={searchString}
        />
      </div>
    </div>
  );
};

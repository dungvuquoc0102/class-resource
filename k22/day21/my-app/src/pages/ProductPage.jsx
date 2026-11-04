import { useNavigate, useSearchParams } from "react-router";

export default function ProductPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    // navigate(
    //   `/${searchParams.get("prev") === "home" ? "" : searchParams.get("prev")}`,
    // );
    navigate(-1);
  };
  const currentPage = searchParams.get("page");
  return (
    <>
      <div>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
          <li>Product 4</li>
          <li>Product 5</li>
          <li>Product 6</li>
          <li>Product 7</li>
          <li>Product 8</li>
          <li>Product 9</li>
          <li>Product 10</li>
          <li>Product 11</li>
          <li>Product 12</li>
          <li>Product 13</li>
          <li>Product 14</li>
          <li>Product 15</li>
          <li>Product 16</li>
          <li>Product 17</li>
          <li>Product 18</li>
          <li>Product 19</li>
          <li>Product 20</li>
          <li>Product 21</li>
          <li>Product 22</li>
          <li>Product 23</li>
          <li>Product 24</li>
          <li>Product 25</li>
          <li>Product 26</li>
          <li>Product 27</li>
          <li>Product 28</li>
          <li>Product 29</li>
          <li>Product 30</li>
        </ul>
      </div>
      <button onClick={handleClick}>Back</button>
      <div>
        <button
          className={`bg-orange-500 text-white px-2 rounded-full ${currentPage === "1" ? "underline" : ""}`}
          onClick={() => setSearchParams({ page: 1 })}
        >
          1
        </button>
        <button
          className={`bg-orange-500 text-white px-2 rounded-full ${currentPage === "2" ? "underline" : ""}`}
          onClick={() => setSearchParams({ page: 2 })}
        >
          2
        </button>
      </div>
    </>
  );
}

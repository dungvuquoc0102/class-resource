import { useQuery } from "@tanstack/react-query";
import PostItem from "./PostItem";
import { http } from "../../services/http";

const fetchPosts = async () => {
  return await http.get("/posts/feed");
};

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="container ">
        <div className="font-semibold leading-15 text-center">Home</div>
        <div className="border h-dvh border-b-0 rounded-t-2xl shadow-lg overflow-y-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data.map((post) => <PostItem post={post} key={post.id} />)
          )}
        </div>
      </div>
    </div>
  );
}

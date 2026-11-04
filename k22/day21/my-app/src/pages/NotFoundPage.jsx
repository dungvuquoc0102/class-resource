import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <div>404 Not Found</div>
      <Link to="/">Back to Home Page</Link>
    </>
  );
}

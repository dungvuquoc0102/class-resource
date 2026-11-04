import { useParams } from "react-router";

export default function FilePage() {
  const { "*": filePath } = useParams();
  return <div>File Page - File path: {filePath}</div>;
}

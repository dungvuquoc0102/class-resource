import { useParams } from "react-router";

export default function ProductDetailPage() {
  const { id } = useParams();
  return <div>Product Detail Page - Product id: {id}</div>;
}

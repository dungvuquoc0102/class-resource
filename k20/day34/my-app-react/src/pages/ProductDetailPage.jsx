import { useParams } from "react-router";

export default function ProductDetailPage() {
  const { slug } = useParams();
  return <div>Chi tiết sản phẩm: {slug}</div>;
}

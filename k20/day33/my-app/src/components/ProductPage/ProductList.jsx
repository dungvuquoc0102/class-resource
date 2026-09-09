export default function ProductList({ products }) {
  console.log(products);

  const productList = products.map((product) => (
    <div
      key={product.id}
      className="shadow-2xl rounded-2xl flex flex-col gap-4 px-5"
    >
      <img src={`https://cellphones.f8team.dev${product.thumbnail}`} alt="" />
      <div className="text-2xl font-bold min-h-16 m-5 mb-0">{product.name}</div>
      <div className="text-xl text-red-500 font-bold m-5 mt-0">
        {product.priceVnd.toLocaleString("vi-VN")} đ
      </div>
    </div>
  ));
  return <div className="grid grid-cols-4 gap-10">{productList}</div>;
}

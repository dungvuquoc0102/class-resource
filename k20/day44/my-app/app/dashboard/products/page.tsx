import Button from "./Button";
import { Suspense } from "react";
import Products from "./Products";
import ProductSkeleton from "./ProductSkeleton";
export default async function Page() {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(null);
  //   }, 1000);
  // });
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
      {/* <Search /> */}
      {/* <Link
        className="inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        href="/dashboard/products/create"
      >
        Thêm sản phẩm
      </Link> */}
      <div>
        <Button />
      </div>
      {/* <Suspense fallback={<ProductSkeleton />}> */}
      <Products />
      {/* </Suspense> */}
    </section>
  );
}

// Server (tài khoản mật khẩu) ->  Database

// static rendering: trong quá trình build render sẵn HTML -> sau đó client gửi req thì trả về mã HTML đã được render
// dynamic rendering: mỗi lần người dùng gửi req là render rồi gửi HTML về

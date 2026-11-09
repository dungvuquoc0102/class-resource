import { getProducts } from "@/app/lib/products";
import Link from "next/link";

export default async function Page() {
  const result = await getProducts();
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
      {result.items.length === 0 ? (
        <p>Không có sản phẩm phù hợp.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Tên
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Giá
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((product) => (
                <tr key={product.id}>
                  <td className="border-t px-4 py-3">
                    <Link
                      className="font-medium text-blue-700 hover:underline"
                      href={`/dashboard/products/${product.id}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="border-t px-4 py-3">
                    {product.price.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="border-t px-4 py-3">
                    <Link
                      className="font-medium text-blue-700 hover:underline"
                      href={`/dashboard/products/${product.id}/edit`}
                    >
                      Sửa
                    </Link>
                    <form
                      // action={deleteProductAction.bind(null, product.id)}
                      className="ml-3 inline"
                    >
                      <button
                        className="font-medium text-red-700 hover:underline"
                        type="submit"
                        aria-label={`Xóa ${product.name}`}
                      >
                        Xóa
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p>
        Có {result.total} sản phẩm. Trang {result.currentPage}/
        {result.totalPages}
      </p>
      <nav
        className="flex gap-4 text-sm font-medium text-blue-700"
        aria-label="Phân trang sản phẩm"
      >
        {result.currentPage > 1 && (
          <Link
            // href={hrefFor(result.currentPage - 1)}
            href={""}
          >
            Trước
          </Link>
        )}
        {result.currentPage < result.totalPages && (
          <Link
            // href={hrefFor(result.currentPage + 1)}
            href={""}
          >
            Sau
          </Link>
        )}
      </nav>
    </section>
  );
}

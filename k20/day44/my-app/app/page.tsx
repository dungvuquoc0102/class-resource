import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // <div className="text-red-500">
    //   <div>Hello F8</div>
    //   <Image
    //     className="hidden md:block"
    //     src="/img1.png"
    //     alt="img1"
    //     width={500}
    //     height={500}
    //   />
    //   <Image
    //     className="block md:hidden"
    //     src="/img1.png"
    //     alt="img1"
    //     width={200}
    //     height={200}
    //   />
    // </div>
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Trang chủ</h1>
      <p className="mt-3 text-slate-600">
        Ứng dụng quản lý sản phẩm viết bằng Next.js.
      </p>
      <Link
        className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        href="/dashboard"
      >
        Vào trang quản lý
      </Link>
    </main>
  );
}

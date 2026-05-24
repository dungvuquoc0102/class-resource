"use client";
import { useRouter } from "next/navigation";

export default function SubmitButton() {
  const router = useRouter();

  function handleClick() {
    // Logic xử lý…
    router.push("/user"); // Điều hướng
    // hoặc
    // router.back(); // Quay lại
    // router.refresh(); // Reload current page từ server
  }

  return (
    <button
      className="p-2 text-white bg-blue-300 border-blue-700 hover:bg-blue-500"
      onClick={handleClick}
    >
      Gửi
    </button>
  );
}

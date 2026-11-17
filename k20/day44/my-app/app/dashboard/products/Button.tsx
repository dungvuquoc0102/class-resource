"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Button() {
  const [state, setState] = useState(0);
  const router = useRouter();

  const handleBack = () => {
    router.replace("/dashboard");
  };

  return (
    <>
      <button onClick={handleBack}>Quay lại trang Dashboard</button>
    </>
  );
}

// Client -(request http://localhost:3000/dashboard/products)-> Server (pnpm dev)
// Server -HTML tĩnh, RSC Payload-> Client
// React đọc RSC Payload để biết component nào cần gắn tương tác
// Gắn tương tác và người dùng có thể thao tác

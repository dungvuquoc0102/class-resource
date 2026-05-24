import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex gap-4 p-2">
      <Link className="p-2 border border-white rounded-md" href="/">
        Home
      </Link>
      <Link className="p-2 border border-white rounded-md" href="/user">
        User
      </Link>
      <Link className="p-2 border border-white rounded-md" href="/product">
        Product
      </Link>
    </nav>
  );
}

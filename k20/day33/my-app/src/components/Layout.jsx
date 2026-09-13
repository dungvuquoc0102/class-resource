export default function Layout({ children }) {
  return (
    <>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </>
  );
}

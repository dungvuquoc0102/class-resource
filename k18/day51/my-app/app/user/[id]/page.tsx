export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const searchParamsData = await searchParams;
  console.log(searchParamsData);

  return (
    <div>
      <h1>User detail</h1>
      <p>User ID: {id}</p>
    </div>
  );
}

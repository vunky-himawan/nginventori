export const transformRequest = (searchParams: URLSearchParams) => {
  const page = parseInt(searchParams.get("page") ?? "1");
  const per_page = parseInt(searchParams.get("perPage") ?? "10");
  const search = searchParams.get("search") ?? "";
  const order = searchParams.get("order") ?? "asc";
  const sort = searchParams.get("sort") ?? "name";

  return { page, per_page, search, order, sort };
};

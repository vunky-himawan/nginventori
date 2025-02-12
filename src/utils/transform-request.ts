interface DefaultParams {
  page: number;
  perPage: number;
  search: string;
  order: "asc" | "desc";
  sort: string;
  withTrashed: number;
}

export const transformRequest = <T extends Record<string, string | number>>(
  searchParams: URLSearchParams,
): T => {
  const defaultParams: DefaultParams = {
    page: 1,
    perPage: 10,
    search: "",
    order: "asc",
    sort: "name",
    withTrashed: 0,
  };

  const result: Partial<T> = {};

  searchParams.forEach((value, key) => {
    if (key in defaultParams) {
      const numValue = Number(value);
      (result as Record<string, string | number>)[key] = Number.isNaN(numValue) ? value : numValue;
    }
  });

  Object.entries(defaultParams).forEach(([key, defaultValue]) => {
    if (!(key in result)) {
      (result as Record<string, string | number>)[key] = defaultValue;
    }
  });

  return result as T;
};

import { TPaginateRequest, TPaginationMeta, TPaginationResponse } from "@/types/meta";

export const paginationTransform = (t?: TPaginationMeta) => {
  return {
    current: t?.page,
    pageSize: t?.perPage,
    total: t?.total,
  };
};

export const makeSource = <T>(data?: TPaginationResponse<T>) => {
  return {
    data: data?.data,
    meta: paginationTransform(data?.meta),
  };
};

export const makePagination = (pagination: TPaginateRequest) => {
  return {
    page: pagination.page ?? 1,
    perPage: pagination.perPage ?? 10,
  };
};

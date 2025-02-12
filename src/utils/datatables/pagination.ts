import { TPaginateRequest, TPaginationMeta } from "@/types/meta";
import { PageNumberCounters, PageNumberPagination } from "prisma-extension-pagination/dist/types";

export const convertPaginationMeta = (
  meta: PageNumberPagination & PageNumberCounters,
  queryParam: TPaginateRequest,
): TPaginationMeta => {
  return {
    page: meta.currentPage,
    perPage: queryParam.perPage,
    total: meta.totalCount,
    totalPage: Math.ceil(meta.totalCount / queryParam.perPage),
  };
};

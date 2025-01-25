"use client";

import { useSearchParams } from "next/navigation";
import { useTableFilter } from "./use-table-filter";

export const useFilter = () => {
  const searchParams = useSearchParams();

  return useTableFilter({ searchParams });
};

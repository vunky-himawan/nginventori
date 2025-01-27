"use client";

import { decodeQueryParam, encodeQueryParam, validateQueryParam } from "@/utils/url";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

export const useTableFilter = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const router = useRouter();
  const pathname = usePathname();

  const parseSearchParams = useCallback(() => {
    return Array.from(searchParams.entries()).reduce<
      Record<string, string | number | boolean | undefined>
    >(
      (acc, [key, value]) => {
        acc[key] = decodeQueryParam(value);
        return acc;
      },
      { search: "" },
    );
  }, [searchParams]);

  const [filters, setFilters] =
    useState<Record<string, string | number | boolean | undefined>>(parseSearchParams());

  const updateUrl = useCallback(
    (newParams: Record<string, string | number | boolean | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          const stringValue = String(value);
          if (validateQueryParam(stringValue)) {
            params.set(key, encodeQueryParam(stringValue));
          }
        }
      });
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const debouncedSearch = useRef(
    debounce((value) => {
      updateUrl({ search: value, page: 1, per_page: 10 });
    }, 500),
  ).current;

  const handleChange = useMemo(
    () => ({
      onFilterChange: (newFilters: Record<string, string | number | boolean | undefined>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        updateUrl({ ...newFilters, page: 1, per_page: 10 });
      },
      onSortingChange: (sortKey: string, order: "asc" | "desc") => {
        setFilters((prev) => ({ ...prev, sort: sortKey, order }));
        updateUrl({ sort: sortKey, order, page: 1, per_page: 10 });
      },
      onPaginationChange: (page: number, perPage: number) => {
        setFilters((prev) => ({ ...prev, page, per_page: perPage }));
        updateUrl({ page, per_page: perPage });
      },
      onSearch: (searchTerm: string) => {
        setFilters((prev) => ({ ...prev, search: searchTerm }));
        debouncedSearch(searchTerm);
      },
    }),
    [updateUrl, debouncedSearch],
  );

  useEffect(() => {
    setFilters(parseSearchParams());
  }, [searchParams, parseSearchParams]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const pagination = useMemo(
    () => ({
      page: Number(filters.page) || 1,
      per_page: Number(filters.per_page) || 10,
    }),
    [filters],
  );

  return { handleChange, pagination, filters };
};

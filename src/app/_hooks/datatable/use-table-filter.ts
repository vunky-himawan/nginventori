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

  const [searchInput, setSearchInput] = useState<string | undefined>(filters.search?.toString());

  const updateUrl = useCallback(
    (newParams: Record<string, string | number | boolean | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      params.forEach((_, key) => {
        if (!(key in newParams) && !["page", "perPage"].includes(key)) {
          params.delete(key);
        }
      });

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

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newUrl);
    },
    [pathname, router, searchParams],
  );

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value }));
      updateUrl({ search: value, page: 1, perPage: 10 });
    }, 500),
  ).current;

  const handleChange = useMemo(
    () => ({
      onFilterChange: (newFilters: Record<string, string | number | undefined>) => {
        console.log("newFilters", newFilters);
        setFilters((prev) => ({ ...prev, ...newFilters }));
        updateUrl({ ...newFilters, page: 1, perPage: 10 });
      },
      onSortingChange: (sortKey: string, order: "asc" | "desc") => {
        setFilters((prev) => ({ ...prev, sort: sortKey, order }));
        updateUrl({ sort: sortKey, order, page: 1, perPage: 10 });
      },
      onPaginationChange: (page: number, perPage: number) => {
        setFilters((prev) => ({ ...prev, page, perPage: perPage }));
        updateUrl({ page, perPage: perPage });
      },
      onSearch: (searchTerm: string) => {
        setSearchInput(searchTerm);
        debouncedSearch(searchTerm);
      },
    }),
    [updateUrl, debouncedSearch],
  );

  useEffect(() => {
    setFilters(parseSearchParams());
    setSearchInput(parseSearchParams().search?.toString());
  }, [searchParams, parseSearchParams]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const pagination = useMemo(
    () => ({
      page: Number(filters.page) || 1,
      perPage: Number(filters.perPage) || 10,
    }),
    [filters],
  );

  return { handleChange, pagination, filters, searchInput };
};

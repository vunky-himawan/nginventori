"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import DataTablePagination from "./pagination";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { TFilterItem } from "@/types/datatable/filter";
import { Button } from "../button";
import { useMemo } from "react";

interface DataTableProps<TData, TValue> {
  source?: {
    data?: TData[];
    meta?: {
      current?: number;
      pageSize?: number;
      total?: number;
    };
  };
  columns: ColumnDef<TData, TValue>[];
  search?: string;
  placeholderSearch?: string;
  searchStyle?: React.CSSProperties | string;
  filterComponents?: TFilterItem[];
  handleChange: {
    onFilterChange: (newFilters: Record<string, string | number | boolean | undefined>) => void;
    onSortingChange: (sortKey: string, order: "asc" | "desc") => void;
    onPaginationChange: (page: number, perPage: number) => void;
    onSearch: (searchTerm: string) => void;
  };
  pagination: {
    page: number;
    per_page: number;
  };
}

const Datatable = <TData, TValue>({
  source,
  columns,
  placeholderSearch,
  searchStyle,
  handleChange,
  filterComponents,
  search,
  pagination,
}: DataTableProps<TData, TValue>) => {
  const pageCount = useMemo(() => {
    if (!source?.meta?.total || !pagination.per_page) return 0;
    return Math.ceil(source.meta.total / pagination.per_page);
  }, [source?.meta?.total, pagination.per_page]);

  const table = useReactTable({
    data: source?.data || [],
    columns,
    pageCount: pageCount,
    state: {
      pagination: { pageIndex: pagination.page, pageSize: pagination.per_page },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 rounded-md">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div className="order-2 md:order-1">
            {filterComponents && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Filters</Button>
                </PopoverTrigger>
                <PopoverContent>{/* TODO: Add filter components */}</PopoverContent>
              </Popover>
            )}
          </div>
          <div className="order-1 md:order-2">
            {search !== undefined && (
              <Input
                value={search}
                style={searchStyle && typeof searchStyle === "object" ? searchStyle : undefined}
                className={`${typeof searchStyle === "string" ? searchStyle : ""}`}
                onChange={(e) => handleChange?.onSearch(e.target.value)}
                placeholder={placeholderSearch || "Search..."}
              />
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="bg-gray-50 font-bold text-black" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination onPaginationChange={handleChange?.onPaginationChange} table={table} />
      </div>
    </div>
  );
};

export default Datatable;

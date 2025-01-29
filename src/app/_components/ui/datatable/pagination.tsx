import React from "react";
import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Pagination, PaginationContent, PaginationItem } from "../pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../button";
import { useResponsive } from "@/hooks/use-responsive";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  onPaginationChange: (page: number, perPage: number) => void;
  total: number;
}

/**
 * Komponen untuk menampilkan paginasi pada tabel data.
 *
 * @template TData - Tipe data yang digunakan pada tabel.
 * @param {object} props - Properti yang diterima oleh komponen.
 * @param {Table<TData>} props.table - Objek tabel yang diberikan oleh TanStack Table.
 * @param {number[]} [props.pageSizeOptions=[10, 20, 30, 40, 50]] - Pilihan ukuran halaman.
 */
const DataTablePagination = <TData,>({
  table,
  total,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onPaginationChange,
}: DataTablePaginationProps<TData>) => {
  const { getState, getPageCount } = table;

  // Mendapatkan indeks halaman dan ukuran halaman dari state tabel
  const { pageIndex, pageSize } = getState().pagination;
  const currentPage = pageIndex; // Halaman saat ini (dimulai dari 1)
  const pageCount = getPageCount(); // Total jumlah halaman

  // Hook untuk mendeteksi ukuran layar (responsiveness)
  const { isLg } = useResponsive();
  const pageRange = !isLg ? 1 : 2; // Jarak halaman yang ditampilkan pada navigasi

  // Menghitung rentang data yang ditampilkan pada halaman saat ini
  const start = pageIndex * pageSize - pageSize + 1;

  /**
   * Menghasilkan daftar nomor halaman yang akan ditampilkan.
   * Menyisipkan "..." jika jumlah halaman terlalu banyak.
   * @returns {(number | string)[]} Daftar nomor halaman.
   */
  const generatePageNumbers = (): (number | string)[] => {
    const maxVisiblePages = !isLg ? 3 : 6; // Maksimal jumlah halaman yang terlihat

    if (pageCount <= maxVisiblePages) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    if (currentPage <= pageRange + 1) {
      pages.push(...Array.from({ length: pageRange + 2 }, (_, i) => i + 1), "...");
    } else if (currentPage >= pageCount - pageRange) {
      pages.push(
        "...",
        ...Array.from({ length: pageRange + 2 }, (_, i) => pageCount - pageRange - 1 + i),
      );
    } else {
      pages.push("...", currentPage - pageRange, currentPage, currentPage + pageRange, "...");
    }

    return pages;
  };

  /**
   * Menangani klik pada elemen "..." untuk melompat ke halaman tertentu.
   * @param {number} index - Indeks elemen "...".
   */
  const handleEllipsisClick = (index: number) => {
    const isFirstEllipsis = index === 0;
    const jumpAmount = Math.floor(pageCount / 3); // Jumlah halaman untuk dilompati
    const newPage = isFirstEllipsis
      ? Math.max(1, currentPage - jumpAmount)
      : Math.min(pageCount, currentPage + jumpAmount);
    onPaginationChange(newPage, pageSize);
  };

  /**
   * Merender tombol halaman.
   * @param {number | string} page - Nomor atau simbol halaman.
   * @param {number} index - Indeks tombol halaman.
   * @returns {JSX.Element} Elemen tombol halaman.
   */
  const renderPageButton = (page: number | string, index: number) => {
    if (typeof page === "number") {
      return (
        <Button
          variant={currentPage === page ? "default" : "outline"}
          className="h-8 w-8"
          onClick={() => onPaginationChange(page, pageSize)}
        >
          {page}
        </Button>
      );
    }

    return (
      <Button variant="outline" className="h-8 w-8" onClick={() => handleEllipsisClick(index)}>
        {page}
      </Button>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
      {/* Bagian untuk memilih ukuran halaman */}
      <div className="flex w-full items-center justify-center gap-3 lg:w-max">
        <div className="w-20">
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPaginationChange(currentPage, Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bagian untuk menampilkan informasi rentang data dan kontrol paginasi */}
      <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-min lg:flex-row">
        <p className="lg:w-max lg:flex-1">{`${start}-${total} of ${total} items`}</p>
        <Pagination className="lg:flex-1">
          <PaginationContent className="max-lg:flex max-lg:flex-wrap">
            {/* Tombol kembali ke halaman pertama */}
            <PaginationItem>
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(1, pageSize)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              {/* Tombol untuk ke halaman sebelumnya */}
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(currentPage - 1, pageSize)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {/* Tombol-tombol halaman */}
            {generatePageNumbers().map((page, index) => (
              <PaginationItem key={index}>{renderPageButton(page, index)}</PaginationItem>
            ))}

            <PaginationItem>
              {/* Tombol untuk ke halaman berikutnya */}
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(currentPage + 1, pageSize)}
                disabled={currentPage === pageCount}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
            {/* Tombol ke halaman terakhir */}
            <PaginationItem>
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(pageCount, pageSize)}
                disabled={currentPage === pageCount}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DataTablePagination;

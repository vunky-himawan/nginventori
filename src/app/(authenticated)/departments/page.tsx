"use client";

import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import Page from "@/app/_components/layouts/page/main";
import Datatable from "@/app/_components/ui/datatable/datatable";
import { useFilter } from "@/hooks/datatable/use-filter";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import { ColumnDef } from "@tanstack/react-table";
import { Department } from "@prisma/client";
import { Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { DialogDelete } from "@/app/_components/ui/dialog/delete-dialog";
import { TFilterItem } from "@/types/datatable/filter";
import { useGetDepartments } from "./_hooks/use-get-department";
import { makePagination, makeSource } from "@/utils/datatables/misc";
import { useDeleteDepartment } from "./_hooks/use-delete-department";

const DepartmentPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>();

  const { mutate: deleteDepartment, isPending: isDeleting } = useDeleteDepartment();
  const { filters, handleChange, pagination, searchInput } = useFilter();

  const { data, isLoading, isRefetching } = useGetDepartments({
    ...makePagination(pagination),
    search: filters.search?.toString() || "",
    sort: "name",
    order: "asc",
    withTrashed: Number(filters.withTrashed),
  });

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="w-[100px]">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="w-[100px]">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => <div className="w-[100px]">{row.getValue("created_at")}</div>,
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => <div className="w-[100px]">{row.getValue("updated_at")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2">
            <Link href={`/departments/${row.original.id}`}>
              <Button variant="outline" size="sm">
                <Eye color="green" />
              </Button>
            </Link>
            <Link href={`/departments/${row.original.id}/update`}>
              <Button variant="outline" size="sm">
                <Pencil color="#1e40af" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedDepartmentId(Number(row.original.id));
              }}
            >
              <Trash color="red" />
            </Button>
          </div>
        );
      },
    },
  ];

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Departments",
      path: "/departments",
    },
  ];

  const filterComponents: TFilterItem[] = [
    {
      key: "withTrashed",
      label: "With Trashed",
      name: "withTrashed",
      type: "select",
      placeholder: "Search by select...",
      defaultValue:
        Number(filters.withTrashed) < 0 || Number(filters.withTrashed) > 2
          ? 0
          : filters.withTrashed,
      options: [
        { label: "Default", value: "0" },
        { label: "With Trashed", value: "1" },
        { label: "Only Trashed", value: "2" },
      ],
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.VIEW_DEPARTMENTS]} type="page">
      <Page
        breadcrumbs={breadcrumbs}
        title="Departments"
        description="List of all departments"
        topActions={<TopActions />}
      >
        <Datatable
          source={makeSource(data)}
          isLoading={isLoading || isRefetching}
          columns={columns}
          search={searchInput || ""}
          handleChange={handleChange}
          placeholderSearch="Search departments..."
          pagination={pagination}
          filterComponents={filterComponents}
        />
        <DialogDelete
          title="Delete Department"
          description="Are you sure you want to delete this department?"
          isDeleting={isDeleting}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedDepartmentId(undefined);
          }}
          onConfirm={async () => {
            await deleteDepartment(selectedDepartmentId!);
            setIsDeleteModalOpen(false);
            setSelectedDepartmentId(undefined);
          }}
        />
      </Page>
    </Guard>
  );
};

const TopActions = () => {
  return (
    <Link href="/departments/create">
      <Button>Create Department</Button>
    </Link>
  );
};

export default DepartmentPage;

"use client";

import { useFilter } from "@/hooks/datatable/use-filter";
import { makePagination, makeSource } from "@/utils/datatables/misc";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { OfficeLocation } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { TFilterItem } from "@/types/datatable/filter";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import Page from "@/app/_components/layouts/page/main";
import Datatable from "@/app/_components/ui/datatable/datatable";
import { DialogDelete } from "@/app/_components/ui/dialog/delete-dialog";
import { formatedDate } from "@/utils/date-formatter";
import { useDeleteOfficeLocation } from "./_hooks/use-delete-office-location";
import { useGetOfficeLocations } from "./_hooks/use-get-office-location";

const OfficeLocationPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedOfficeLocationId, setSelectedOfficeLocationId] = useState<number | undefined>();

  const { mutate: deleteOfficeLocation} = useDeleteOfficeLocation();
  const { filters, handleChange, pagination, searchInput } = useFilter();
  
  const { data, isLoading, isRefetching } = useGetOfficeLocations({
    ...makePagination(pagination),
    search: filters.search?.toString() || "",
    sort: "name",
    order: "asc",
    withTrashed: Number(filters.withTrashed),
  });

  const columns: ColumnDef<OfficeLocation>[] = [
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
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="w-max">
          {row.getValue("createdAt") ? formatedDate(new Date(row.getValue("createdAt")), true) : ""}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => (
        <div className="w-max">
          {row.getValue("updatedAt") ? formatedDate(new Date(row.getValue("updatedAt")), true) : ""}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2">
            <Link href={`/office-locations/${row.original.id}`}>
              <Button variant="outline" size="sm">
                <Eye color="green" />
              </Button>
            </Link>
            <Link href={`/office-locations/${row.original.id}/update`}>
              <Button variant="outline" size="sm">
                <Pencil color="#1e40af" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedOfficeLocationId(Number(row.original.id));
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
      label: "Office Locations",
      path: "/office-locations",
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
    <Guard allowedPermissions={[PERMISSIONS.VIEW_EMPLOYEE_TYPES]} type="page">
      <Page
        breadcrumbs={breadcrumbs}
        title="Office Locations"
        description="List of all Office Locations"
        topActions={<TopActions />}
      >
        <Datatable
          source={makeSource(data)}
          isLoading={isLoading || isRefetching}
          columns={columns}
          search={searchInput || ""}
          handleChange={handleChange}
          placeholderSearch="Search Office Locations..."
          pagination={pagination}
          filterComponents={filterComponents}
        />
        <DialogDelete
          title="Delete Office Locations"
          description="Are you sure you want to delete this Office Locations?"
          isDeleting={false}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedOfficeLocationId(undefined);
          }}
          onConfirm={async () => {
            await deleteOfficeLocation(selectedOfficeLocationId!);
            setIsDeleteModalOpen(false);
            setSelectedOfficeLocationId(undefined);
          }}
        />
      </Page>
    </Guard>
  );
};

const TopActions = () => {
  return (
    <Link href="/office-locations/create">
      <Button>Create Office Location</Button>
    </Link>
  );
};

export default OfficeLocationPage;

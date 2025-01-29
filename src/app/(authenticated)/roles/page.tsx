"use client";

import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import Page from "@/app/_components/layouts/page/main";
import Datatable from "@/app/_components/ui/datatable/datatable";
import { useFilter } from "@/hooks/datatable/use-filter";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import { useGetRoles } from "./_hooks/use-get-roles";
import { makePagination, makeSource } from "@/utils/datatables/misc";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";
import { Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { DialogDelete } from "@/app/_components/ui/dialog/delete-dialog";
import { useDeleteRole } from "./_hooks/use-delete-role";

const RolesPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>();

  const { mutate: deleteRole, isPending: isDeleting } = useDeleteRole();

  const { filters, handleChange, pagination, searchInput } = useFilter();

  const { data, isLoading, isRefetching } = useGetRoles({
    ...makePagination(pagination),
    search: filters.search?.toString() || "",
    sort: "name",
    order: "asc",
  });

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="w-[100px]">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => (
        <div className="w-max">{new Date(row.getValue("created_at")).toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2">
            <Link href={`/roles/${row.original.id}`}>
              <Button variant="outline" size="sm">
                <Eye color="green" />
              </Button>
            </Link>
            <Link href={`/roles/${row.original.id}/update`}>
              <Button variant="outline" size="sm">
                <Pencil color="#1e40af" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedRoleId(Number(row.original.id));
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
      label: "Roles",
      path: "/roles",
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.VIEW_ROLES]} type="page">
      <Page
        breadcrumbs={breadcrumbs}
        title="Roles"
        description="List of all roles"
        topActions={<TopActions />}
      >
        <Datatable
          source={makeSource(data)}
          isLoading={isLoading || isRefetching}
          columns={columns}
          search={searchInput || ""}
          handleChange={handleChange}
          placeholderSearch="Search roles..."
          pagination={pagination}
        />
        <DialogDelete
          title="Delete Role"
          description="Are you sure you want to delete this role?"
          isDeleting={isDeleting}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedRoleId(undefined);
          }}
          onConfirm={async () => {
            await deleteRole(selectedRoleId!);
            setIsDeleteModalOpen(false);
            setSelectedRoleId(undefined);
          }}
        />
      </Page>
    </Guard>
  );
};

const TopActions = () => {
  return (
    <Link href="/roles/create">
      <Button>Create Role</Button>
    </Link>
  );
};

export default RolesPage;

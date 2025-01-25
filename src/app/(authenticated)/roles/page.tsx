"use client";

import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import Page from "@/app/_components/layouts/page/main";
import { rolesColumns } from "./_components/role-columns";
import Datatable from "@/app/_components/ui/datatable/datatable";
import { useFilter } from "@/hooks/datatable/use-filter";

const RolesPage = () => {
  const { filters, handleChange, pagination } = useFilter();

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
    <Page
      breadcrumbs={breadcrumbs}
      title="Roles"
      description="List of all roles"
      topActions={<TopActions />}
    >
      <Datatable
        columns={rolesColumns}
        search={filters.search?.toString() || ""}
        handleChange={handleChange}
        placeholderSearch="Search roles..."
        pagination={pagination}
      />
    </Page>
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

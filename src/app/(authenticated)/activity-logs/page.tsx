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
import { Eye } from "lucide-react";
import { useGetActivityLogs } from "./_hooks/use-get-activity-logs";
import { makePagination, makeSource } from "@/utils/datatables/misc";
import { ActivityLogWithActor } from "@/libs/prisma/types/activity-logs-with-actor";
import { generateActionBadge } from "./_utils/generate-action-badge";

const ActivityLogsPage = () => {
  const { handleChange, pagination, searchInput, filters } = useFilter();

  const { data, isLoading, isRefetching } = useGetActivityLogs({
    ...makePagination(pagination),
    search: filters.search?.toString() || "",
    sort: "logName",
    order: "asc",
  });

  const columns: ColumnDef<ActivityLogWithActor>[] = [
    {
      accessorKey: "logName",
      header: "Name",
      cell: ({ row }) => <div className="w-[200px]">{row.original.logName}</div>,
    },
    {
      accessorFn: (row) => row.actor.name,
      header: "Username",
      cell: ({ row }) => <div className="w-[200px]">{row.original.actor.name}</div>,
    },
    {
      accessorFn: (row) => row.actor.email,
      header: "Email",
      cell: ({ row }) => <div className="w-[200px]">{row.original.actor.email}</div>,
    },
    {
      accessorKey: "subjectType",
      header: "Subject Type",
      cell: ({ row }) => <div className="w-[200px]">{row.original.subjectType}</div>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="w-[200px]">{generateActionBadge(row.original.action)}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2">
            <Link href={`/activity-logs/${row.original.id}`}>
              <Button variant="link" size="sm">
                <Eye color="green" />
              </Button>
            </Link>
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
      label: "Activity Logs",
      path: "/activity-logs",
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.VIEW_ACTIVITY_LOGS]} type="page">
      <Page breadcrumbs={breadcrumbs} title="Activity Logs" description="List of all activity logs">
        <Datatable
          source={makeSource(data)}
          isLoading={isLoading || isRefetching}
          columns={columns}
          search={searchInput || ""}
          handleChange={handleChange}
          placeholderSearch="Search activity logs..."
          pagination={pagination}
        />
      </Page>
    </Guard>
  );
};

export default ActivityLogsPage;

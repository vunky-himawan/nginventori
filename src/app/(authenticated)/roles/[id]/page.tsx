"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/app/_components/ui/table";
import { PERMISSIONS } from "@/common/enums/permissions";
import { useParams } from "next/navigation";
import { useGetRole } from "./_hooks/use-get-role";
import { formatedDate } from "@/utils/date-formatter";
import { Badge } from "@/app/_components/ui/badge";

const RolePage = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useGetRole(Number(id));

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: "Detail Role",
      path: `/roles/${id}`,
    },
  ];

  return (
    <Guard type="page" allowedPermissions={[PERMISSIONS.SHOW_ROLE]}>
      <Page title="Detail Role" breadcrumbs={breadcrumbs} isLoading={isLoading || isFetching}>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-fit font-bold">Name</TableHead>
              <TableCell>{data?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Permissions</TableHead>
              <TableCell className="flex h-max flex-wrap gap-3">
                {data?.permissions.map((permission) => (
                  <Badge
                    variant={"outline"}
                    key={permission.id}
                    className="w-max border border-green-300 !bg-green-100 font-medium text-green-500"
                  >
                    {permission.name}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Created At</TableHead>
              <TableCell>
                {data?.createdAt && formatedDate(new Date(data.createdAt), true)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Updated At</TableHead>
              <TableCell>
                {data?.updatedAt && formatedDate(new Date(data.updatedAt), true)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Page>
    </Guard>
  );
};

export default RolePage;

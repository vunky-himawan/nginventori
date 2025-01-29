"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/app/_components/ui/table";
import { PERMISSIONS } from "@/common/enums/permissions";
import { useParams } from "next/navigation";
import { useGetRole } from "./_hooks/use-get-role";
import { formatedDate } from "@/utils/date-formatter";
import { Permission } from "@prisma/client";
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
                {data?.permissions.map((permission: Permission) => (
                  <Badge className="w-max" variant={"outline"} key={permission.id}>
                    {permission.name}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Created At</TableHead>
              <TableCell>
                {data?.created_at && formatedDate(new Date(data.created_at), true)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Updated At</TableHead>
              <TableCell>
                {data?.updated_at && formatedDate(new Date(data.updated_at), true)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Page>
    </Guard>
  );
};

export default RolePage;

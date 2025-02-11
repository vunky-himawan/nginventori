"use client";

import { useParams } from "next/navigation";
import { useGetDepartment } from "./_hooks/use-get-department";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import Page from "@/app/_components/layouts/page/main";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/app/_components/ui/table";
import { formatedDate } from "@/utils/date-formatter";

const DepartmentPage = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useGetDepartment(Number(id));

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Departments",
      path: "/departments",
    },
    {
      label: "Detail Department",
      path: `/departments/${id}`,
    },
  ];

  return (
    <Guard type="page" allowedPermissions={[PERMISSIONS.SHOW_DEPARTMENT]}>
      <Page title="Detail Department" breadcrumbs={breadcrumbs} isLoading={isLoading || isFetching}>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-fit font-bold">Name</TableHead>
              <TableCell>{data?.name}</TableCell>
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

export default DepartmentPage;

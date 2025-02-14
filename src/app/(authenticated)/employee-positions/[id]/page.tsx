"use client"

import { useParams } from "next/navigation";
import { useGetEmployeePosition } from "./_hooks/use-get-employee-position";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import Page from "@/app/_components/layouts/page/main";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/app/_components/ui/table";
import { formatedDate } from "@/utils/date-formatter";

const EmployeePositionPage = () => {
    const {id} = useParams();

    const {data, isLoading, isFetching} = useGetEmployeePosition(Number(id));

    const breadcrumbs: TBreadcrumb[] = [
        {
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            label: "Employee Positions",
            path: "/employee-positions",
        },
        {
            label: "Detail Employee Position",
            path: `/employee-positions/${id}`,
        },
    ];

    return (
        <Guard type="page" allowedPermissions={[PERMISSIONS.SHOW_EMPLOYEE_POSITION]}>
            <Page title="Detail Employee Position" breadcrumbs={breadcrumbs} isLoading={isLoading || isFetching}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead className="w-fit font-bold">Name</TableHead>
                            <TableCell>{data?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead className="w-fit font-bold">Created At</TableHead>
                            <TableCell>{data?.createdAt && formatedDate(new Date(data.createdAt), true)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead className="w-fit font-bold">Updated At</TableHead>
                            <TableCell>{data?.updatedAt && formatedDate(new Date(data.updatedAt), true)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Page>
        </Guard>
    );
};

export default EmployeePositionPage;
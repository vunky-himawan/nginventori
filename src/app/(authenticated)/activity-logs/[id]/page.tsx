"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/app/_components/ui/table";
import { PERMISSIONS } from "@/common/enums/permissions";
import { useParams } from "next/navigation";
import { formatedDate } from "@/utils/date-formatter";
import { useGetActivityLog } from "./_hooks/use-get-activity-log";
import dynamic from "next/dynamic";
import { Button } from "@/app/_components/ui/button";
import { ClipboardList } from "lucide-react";
import { toast } from "@/app/_components/ui/toast/main";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

const ActivityLogPage = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useGetActivityLog(Number(id));

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Activity Logs",
      path: "/activity-logs",
    },
    {
      label: "Detail Activity Log",
      path: `/activity-logs/${id}`,
    },
  ];

  const handleSuccessCopy = () => {
    toast({
      title: "Copied to clipboard",
      type: "success",
    });
  };

  return (
    <Guard type="page" allowedPermissions={[PERMISSIONS.SHOW_ACTIVITY_LOG]}>
      <Page
        title="Detail Activity Log"
        breadcrumbs={breadcrumbs}
        isLoading={isLoading || isFetching}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-fit font-bold">Log Name</TableHead>
              <TableCell>{data?.logName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Actor Name</TableHead>
              <TableCell>{data?.actor.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Actor Email</TableHead>
              <TableCell>{data?.actor.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Description</TableHead>
              <TableCell>{data?.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Subject Type</TableHead>
              <TableCell>{data?.subjectType}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Action</TableHead>
              <TableCell>{data?.action}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Properties</TableHead>
              <TableCell>
                <div className="flex justify-between">
                  <div>
                    {data?.properties && (
                      <ReactJson
                        src={data.properties as Record<string, unknown>}
                        name={false}
                        displayDataTypes={false}
                        enableClipboard={false}
                      />
                    )}
                  </div>
                  <CopyToClipboard
                    text={JSON.stringify(data?.properties, null, 2)}
                    onCopy={handleSuccessCopy}
                  >
                    <Button size={"sm"} variant="outline">
                      <ClipboardList />
                      <span className="ml-2">Copy</span>
                    </Button>
                  </CopyToClipboard>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-fit font-bold">Created At</TableHead>
              <TableCell>
                {data?.createdAt && formatedDate(new Date(data.createdAt), true)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Page>
    </Guard>
  );
};

export default ActivityLogPage;

"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { Button } from "@/app/_components/ui/button";
import { PERMISSIONS } from "@/common/enums/permissions";
import { useGetPermission } from "@/hooks/data/use-get-permission";
import { SignOutButton } from "@clerk/nextjs";

const Dashboard = () => {
  const { data, isLoading } = useGetPermission();

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.DASHBOARD_ADMIN]} type="page">
      <Page isLoading={isLoading} title="Dashboard" breadcrumbs={breadcrumbs}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Hallo {data?.user?.name}</h1>
          {/* <SignOutButton redirectUrl="/">
            <Button>Sign out</Button>
          </SignOutButton> */}
        </div>
      </Page>
    </Guard>
  );
};

export default Dashboard;

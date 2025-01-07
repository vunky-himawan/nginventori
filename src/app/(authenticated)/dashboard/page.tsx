"use client";

import { Button } from "@/app/_components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <SignOutButton redirectUrl="/">
        <Button>Sign out</Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;

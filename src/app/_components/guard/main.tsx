"use client";

import { useEffect, useState } from "react";
import { useGetPermission } from "@/hooks/data/use-get-permission";
import { useRouter } from "next/navigation";
import { hasCommonElements } from "@/utils/function";

type GuardProps = {
  children: React.ReactNode;
  allowedPermissions: string[];
  type: "page" | "component";
};

export const Guard = ({ children, allowedPermissions, type }: GuardProps) => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  const { data, isLoading } = useGetPermission();

  useEffect(() => {
    if (!isLoading) {
      const hasPermission = hasCommonElements(allowedPermissions, data?.permissions);

      setIsAllowed(hasPermission);

      if (type === "page" && !hasPermission) {
        router.replace("/denied");
      }
    }
  }, [isAllowed, type, router, isLoading]);

  if (type === "component" && !isAllowed) {
    return null;
  }

  return isAllowed ? children : null;
};

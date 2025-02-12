import { Badge } from "@/app/_components/ui/badge";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";
import { cn } from "@/libs/utils";

export const generateActionBadge = (action: string) => {
  const statusMap: { [key: string]: { style: string; text: string } } = {
    CREATE: {
      style: "bg-green-200 text-green-500",
      text: ACTIVITY_LOG_ACTION_ENUM.CREATE,
    },
    DELETE: {
      style: "bg-red-200 text-red-500",
      text: ACTIVITY_LOG_ACTION_ENUM.DELETE,
    },
    LOGIN: {
      style: "bg-blue-200 text-blue-500",
      text: ACTIVITY_LOG_ACTION_ENUM.LOGIN,
    },
    UPDATE: {
      style: "bg-yellow-200 text-yellow-500",
      text: ACTIVITY_LOG_ACTION_ENUM.UPDATE,
    },
    LOGOUT: {
      style: "bg-purple-200 text-purple-500",
      text: ACTIVITY_LOG_ACTION_ENUM.LOGOUT,
    },
  };

  const { style, text } = statusMap[action] || {
    color: "bg-orange-200 text-orange-500",
    text: action,
  };

  return (
    <Badge className={cn("font-medium shadow-none", style)} variant={"outline"}>
      {text}
    </Badge>
  );
};

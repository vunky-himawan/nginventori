import { PERMISSIONS } from "@/common/enums/permissions";
import { TPermissionOptions } from "../_types/group-role-type";

export const GROUP_PERMISSIONS_RAW: TPermissionOptions[] = [
  {
    label: "Dashboard",
    permissionOptions: [
      {
        label: "Dashboard Admin",
        value: PERMISSIONS.DASHBOARD_ADMIN,
      },
      {
        label: "Dashboard Employee",
        value: PERMISSIONS.DASHBOARD_EMPLOYEE,
      },
    ],
  },
  {
    label: "Roles Management",
    permissionOptions: [
      {
        label: "Create Role",
        value: PERMISSIONS.CREATE_ROLE,
      },
      {
        label: "View Roles",
        value: PERMISSIONS.VIEW_ROLES,
      },
      {
        label: "Update Role",
        value: PERMISSIONS.UPDATE_ROLE,
      },
      {
        label: "Delete Role",
        value: PERMISSIONS.DELETE_ROLE,
      },
      {
        label: "Show Role",
        value: PERMISSIONS.SHOW_ROLE,
      },
    ],
  },
  {
    label: "Activity Logs",
    permissionOptions: [
      {
        label: "Show Activity Log",
        value: PERMISSIONS.SHOW_ACTIVITY_LOG,
      },
      {
        label: "View Activity Logs",
        value: PERMISSIONS.VIEW_ACTIVITY_LOGS,
      },
    ],
  },
];

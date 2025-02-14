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
    label: "Department Management",
    permissionOptions: [
      {
        label: "Create Department",
        value: PERMISSIONS.CREATE_DEPARTMENT,
      },
      {
        label: "View Departments",
        value: PERMISSIONS.VIEW_DEPARTMENTS,
      },
      {
        label: "Update Department",
        value: PERMISSIONS.UPDATE_DEPARTMENT,
      },
      {
        label: "Delete Department",
        value: PERMISSIONS.DELETE_DEPARTMENT,
      },
      {
        label: "Show Department",
        value: PERMISSIONS.SHOW_DEPARTMENT,
      },
    ]
  },
  {
    label: "Employee Position Management",
    permissionOptions: [
      {
        label: "Create Employee Position",
        value: PERMISSIONS.CREATE_EMPLOYEE_POSITION,
      },
      {
        label: "View Employee Position",
        value: PERMISSIONS.VIEW_EMPLOYEE_POSITIONS,
      },
      {
        label: "Update Employee Position",
        value: PERMISSIONS.UPDATE_EMPLOYEE_POSITION,
      },
      {
        label: "Delete Employee Position",
        value: PERMISSIONS.DELETE_EMPLOYEE_POSITION,
      },
      {
        label: "Show Employee Position",
        value: PERMISSIONS.SHOW_EMPLOYEE_POSITION,
      },
    ]
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

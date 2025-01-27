"use client"; // Ini memastikan file berjalan di client

import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export const rolesColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-max">{new Date(row.getValue("created_at")).toLocaleString()}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* TODO: Implement view */
              toast("View clicked", { duration: 3000 });
            }}
          >
            <Eye color="green" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* TODO: Implement edit */
              toast("Edit clicked", { duration: 3000 });
            }}
          >
            <Pencil color="#1e40af" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* TODO: Implement delete */
              toast("Delete clicked", { duration: 3000 });
            }}
          >
            <Trash color="red" />
          </Button>
        </div>
      );
    },
  },
];

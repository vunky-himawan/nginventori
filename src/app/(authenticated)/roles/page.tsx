"use server";

import { Role } from "@prisma/client";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import Page from "@/app/_components/layouts/page/main";
import Datatable from "@/app/_components/ui/datatable/datatable";
import { rolesColumns } from "./_components/role-columns";

async function getData(): Promise<Role[]> {
  return [
    {
      id: BigInt(1),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(2),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(3),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(4),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(5),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(6),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(7),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(8),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(9),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(10),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(11),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(12),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(13),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(14),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(15),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(16),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(17),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(18),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(19),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(20),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(21),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(22),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(23),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(24),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(25),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(26),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(27),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(28),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(29),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(30),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(31),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(32),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(33),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(34),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(35),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(36),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(37),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(38),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(39),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(40),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(41),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(42),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(43),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(44),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(45),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(46),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(47),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(48),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(49),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(50),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(51),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(52),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(53),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(54),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(55),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(56),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(57),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(58),
      name: "User",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(59),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: BigInt(60),
      name: "Admin",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ];
}

const RolesPage = async () => {
  const data = await getData();

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
  ];

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title="Roles"
      description="List of all roles"
      topActions={<TopActions />}
    >
      <Datatable data={data} columns={rolesColumns} />
    </Page>
  );
};

const TopActions = () => {
  return (
    <Link href={"/roles/create"}>
      <Button>Create Role</Button>
    </Link>
  );
};

export default RolesPage;

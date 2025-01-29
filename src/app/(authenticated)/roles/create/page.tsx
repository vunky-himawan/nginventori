"use client";

import Page from "@/app/_components/layouts/page/main";
import FormRole from "../_components/form";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import { Section } from "@/app/_components/ui/section";
import { useForm } from "react-hook-form";
import {
  createOrUpdateRoleSchema,
  TCreateOrUpdateRoleValidation,
} from "@/server/roles/validation/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRole } from "./_hooks/use-create-role";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";

const CreateRolePage = () => {
  const form = useForm<TCreateOrUpdateRoleValidation>({
    resolver: zodResolver(createOrUpdateRoleSchema),
    defaultValues: {
      name: "",
      permissionIds: [],
    },
  });

  const { mutate, isPending } = useCreateRole();

  const onSubmit = (data: TCreateOrUpdateRoleValidation) => {
    mutate(data);
  };

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: "Create Role",
      path: "/roles/create",
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.CREATE_ROLE]} type="page">
      <Page title="Create Role" breadcrumbs={breadcrumbs}>
        <Section>
          <FormRole form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default CreateRolePage;

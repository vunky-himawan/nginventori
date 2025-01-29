"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import FormRole from "../../_components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrUpdateRoleSchema,
  TCreateOrUpdateRoleValidation,
} from "@/server/roles/validation/create-validation";
import { useParams } from "next/navigation";
import { useGetRole } from "../_hooks/use-get-role";
import { Permission } from "@prisma/client";
import { useUpdateRole } from "./_hooks/use-update-role";
import { Section } from "@/app/_components/ui/section";
import { useEffect } from "react";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";

const UpdateRolePage = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetRole(Number(id));

  const form = useForm<TCreateOrUpdateRoleValidation>({
    resolver: zodResolver(createOrUpdateRoleSchema),
    defaultValues: {
      name: "",
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        permissionIds: data.permissions.map((p: Permission) => Number(p.id)),
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useUpdateRole({ id: Number(id) });

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
      label: "Update Role",
      path: `/roles/${id}/update`,
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.UPDATE_ROLE]} type="page">
      <Page title="Update Role" isLoading={isFetching} breadcrumbs={breadcrumbs}>
        <Section>
          <FormRole form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default UpdateRolePage;

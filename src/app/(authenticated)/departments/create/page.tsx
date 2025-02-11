"use client";

import Page from "@/app/_components/layouts/page/main";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import { Section } from "@/app/_components/ui/section";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import {
  createOrUpdateDepartmentSchema,
  TCreateOrUpdateDepartmentValidation,
} from "@/server/departments/validation/create-update-validation";
import FormDepartment from "../_components/form";
import { useCreateDepartment } from "./_hooks/use-create-department";

const CreateDepartmentPage = () => {
  const form = useForm<TCreateOrUpdateDepartmentValidation>({
    resolver: zodResolver(createOrUpdateDepartmentSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateDepartment();

  const onSubmit = (data: TCreateOrUpdateDepartmentValidation) => {
    mutate(data);
  };

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Departments",
      path: "/departments",
    },
    {
      label: "Create Department",
      path: "/departments/create",
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.CREATE_DEPARTMENT]} type="page">
      <Page title="Create Department" breadcrumbs={breadcrumbs}>
        <Section>
          <FormDepartment form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default CreateDepartmentPage;

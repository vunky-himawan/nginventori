"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Section } from "@/app/_components/ui/section";
import { PERMISSIONS } from "@/common/enums/permissions";
import {
  createOrUpdateEmployeeTypeSchema,
  TCreateOrUpdateEmployeeTypeValidation,
} from "@/server/employee-types/validation/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../employee-positions/_components/form";
import { useCreateEmployeeType } from "./_hooks/use-create-employee-type";

const CreateEmployeeTypePage = () => {
  const form = useForm<TCreateOrUpdateEmployeeTypeValidation>({
    resolver: zodResolver(createOrUpdateEmployeeTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateEmployeeType();

  const onSubmit = (data: TCreateOrUpdateEmployeeTypeValidation) => {
    mutate(data);
  };
  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Employee Types",
      path: "/employee-types",
    },
    {
      label: "Create Employee Type",
      path: "/employee-types/create",
    },
  ];
  return (
    <Guard allowedPermissions={[PERMISSIONS.CREATE_EMPLOYEE_TYPE]} type="page">
      <Page title="Create Employee Position" breadcrumbs={breadcrumbs}>
        <Section>
          <Form form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default CreateEmployeeTypePage;

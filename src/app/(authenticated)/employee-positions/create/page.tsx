"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Section } from "@/app/_components/ui/section";
import { PERMISSIONS } from "@/common/enums/permissions";
import {
  createOrUpdateEmployeePositionSchema,
  TCreateOrUpdateEmployeePositionValidation,
} from "@/server/employee-positions/validation/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../employee-positions/_components/form";
import { useCreateEmployeePosition } from "./_hooks/use-create-employee-position";

const CreateEmployeePositionPage = () => {
  const form = useForm<TCreateOrUpdateEmployeePositionValidation>({
    resolver: zodResolver(createOrUpdateEmployeePositionSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateEmployeePosition();
  
  const onSubmit = (data: TCreateOrUpdateEmployeePositionValidation) => {
    mutate(data);
  };

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Employee Positions",
      path: "/employee-positions",
    },
    {
      label: "Create Employee Position",
      path: "/employee-positions/create",
    },
  ];
  return (
    <Guard allowedPermissions={[PERMISSIONS.CREATE_EMPLOYEE_POSITION]} type="page">
      <Page title="Create Employee Position" breadcrumbs={breadcrumbs}>
        <Section>
          <Form form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default CreateEmployeePositionPage;

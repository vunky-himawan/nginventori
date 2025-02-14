"use client";

import { useParams } from "next/navigation";
import { useGetEmployeePosition } from "../_hooks/use-get-employee-position";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import Page from "@/app/_components/layouts/page/main";
import {
  createOrUpdateEmployeePositionSchema,
  TCreateOrUpdateEmployeePositionValidation,
} from "@/server/employee-positions/validation/create-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useUpdateEmployeePosition } from "./_hooks/use-update-employee-position";
import { Section } from "@/app/_components/ui/section";
import FormDepartment from "@/app/(authenticated)/departments/_components/form";

const EmployeePositionPage = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetEmployeePosition(Number(id));

  const form = useForm<TCreateOrUpdateEmployeePositionValidation>({
    resolver: zodResolver(createOrUpdateEmployeePositionSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useUpdateEmployeePosition({ id: Number(id) });

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
      label: "Detail Employee Position",
      path: `/employee-positions/${id}`,
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.UPDATE_EMPLOYEE_POSITION]} type="page">
      <Page title="Update Employee Position" isLoading={isFetching} breadcrumbs={breadcrumbs}>
        <Section>
          <FormDepartment form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default EmployeePositionPage;

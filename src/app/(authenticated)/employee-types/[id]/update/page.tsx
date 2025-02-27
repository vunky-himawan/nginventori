"use client";

import { useParams } from "next/navigation";
import { useGetEmployeeType } from "../_hooks/use-get-employee-type";
import { useForm } from "react-hook-form";
import {
  createOrUpdateEmployeeTypeSchema,
  TCreateOrUpdateEmployeeTypeValidation,
} from "@/server/employee-types/validation/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useUpdateEmployeeType } from "./_hooks/use-update-employee-type";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import Page from "@/app/_components/layouts/page/main";
import { Section } from "@/app/_components/ui/section";
import FormEmployeeType from "../../_components/form";

const EmployeeTypePage = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetEmployeeType(Number(id));

  const form = useForm<TCreateOrUpdateEmployeeTypeValidation>({
    resolver: zodResolver(createOrUpdateEmployeeTypeSchema),
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

  const { mutate, isPending } = useUpdateEmployeeType({ id: Number(id) });

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
      label: "Detail Employee Type",
      path: `/employee-types/${id}`,
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.UPDATE_EMPLOYEE_TYPE]} type="page">
      <Page title="Update Employee Type" isLoading={isFetching} breadcrumbs={breadcrumbs}>
        <Section>
          <FormEmployeeType form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default EmployeeTypePage;

"use client";

import { useParams } from "next/navigation";
import { useGetDepartment } from "../_hooks/use-get-department";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrUpdateDepartmentSchema,
  TCreateOrUpdateDepartmentValidation,
} from "@/server/departments/validation/create-update-validation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import { useUpdateDepartment } from "./_hooks/use-update-department";
import Page from "@/app/_components/layouts/page/main";
import { Section } from "@/app/_components/ui/section";
import FormDepartment from "../../_components/form";

const UpdateDepartmentPage = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetDepartment(Number(id));

  const form = useForm<TCreateOrUpdateDepartmentValidation>({
    resolver: zodResolver(createOrUpdateDepartmentSchema),
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

  const { mutate, isPending } = useUpdateDepartment({ id: Number(id) });

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
      label: "Update Department",
      path: `/departments/${id}/update`,
    },
  ];
  return (
    <Guard allowedPermissions={[PERMISSIONS.UPDATE_DEPARTMENT]} type="page">
      <Page title="Update Department" isLoading={isFetching} breadcrumbs={breadcrumbs}>
        <Section>
          <FormDepartment form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default UpdateDepartmentPage;

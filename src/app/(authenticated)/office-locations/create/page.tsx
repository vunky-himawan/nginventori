"use client";

import { Guard } from "@/app/_components/guard/main";
import Page from "@/app/_components/layouts/page/main";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Section } from "@/app/_components/ui/section";
import { PERMISSIONS } from "@/common/enums/permissions";
import {
  createOrUpdateOfficeLocationSchema,
  TCreateOrUpdateOfficeLocationValidation,
} from "@/server/office-locations/validation/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../employee-positions/_components/form";
import { useCreateOfficeLocation } from "./_hooks/use-create-office-location";

const CreateOfficeLocationPage = () => {
  const form = useForm<TCreateOrUpdateOfficeLocationValidation>({
    resolver: zodResolver(createOrUpdateOfficeLocationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateOfficeLocation();

  const onSubmit = (data: TCreateOrUpdateOfficeLocationValidation) => {
    mutate(data);
  };
  const breadcrumbs: TBreadcrumb[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Office Locations",
      path: "/office-locations",
    },
    {
      label: "Create Office Location",
      path: "/office-locations/create",
    },
  ];
  return (
    <Guard allowedPermissions={[PERMISSIONS.CREATE_OFFICE_LOCATION]} type="page">
      <Page title="Create Employee Position" breadcrumbs={breadcrumbs}>
        <Section>
          <Form form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default CreateOfficeLocationPage;

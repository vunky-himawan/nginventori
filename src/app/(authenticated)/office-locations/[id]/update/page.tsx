"use client";

import { useParams } from "next/navigation";
import { useGetOfficeLocation } from "../_hooks/use-get-office-location";
import { useForm } from "react-hook-form";
import {
  createOrUpdateOfficeLocationSchema,
  TCreateOrUpdateOfficeLocationValidation,
} from "@/server/office-locations/validation/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useUpdateOfficeLocation } from "./_hooks/use-update-office-location";
import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Guard } from "@/app/_components/guard/main";
import { PERMISSIONS } from "@/common/enums/permissions";
import Page from "@/app/_components/layouts/page/main";
import { Section } from "@/app/_components/ui/section";
import FormOfficeLocation from "../../_components/form";

const OfficeLocationPage = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetOfficeLocation(Number(id));

  const form = useForm<TCreateOrUpdateOfficeLocationValidation>({
    resolver: zodResolver(createOrUpdateOfficeLocationSchema),
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

  const { mutate, isPending } = useUpdateOfficeLocation({ id: Number(id) });

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
      label: "Detail Office Location",
      path: `/office-locations/${id}`,
    },
  ];

  return (
    <Guard allowedPermissions={[PERMISSIONS.UPDATE_OFFICE_LOCATION]} type="page">
      <Page title="Update Office Location" isLoading={isFetching} breadcrumbs={breadcrumbs}>
        <Section>
          <FormOfficeLocation form={form} onSubmit={onSubmit} isLoading={isPending} />
        </Section>
      </Page>
    </Guard>
  );
};

export default OfficeLocationPage;

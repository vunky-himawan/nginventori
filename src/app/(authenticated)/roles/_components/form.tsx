"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { GROUP_PERMISSIONS_RAW } from "../_constants/group-permissions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGetPermissionsOptions } from "@/hooks/data/form-options/use-get-permissions-options";
import { Loading } from "@/components/ui/loading/main";
import { Permission } from "@prisma/client";
import { useCallback } from "react";
import { TCreateOrUpdateRoleValidation } from "@/server/roles/validation/create-validation";

type FormProps = {
  form: UseFormReturn<TCreateOrUpdateRoleValidation>;
  onSubmit: (data: TCreateOrUpdateRoleValidation) => void;
  isLoading: boolean;
};

const FormRole = ({ form, onSubmit, isLoading }: FormProps) => {
  const { data: permissions, isLoading: isLoadingGetPermissions } = useGetPermissionsOptions();

  const handleSubmit = (data: TCreateOrUpdateRoleValidation) => {
    const transformedData = {
      ...data,
      permissionIds: data.permissionIds.map((id) => Number(id)),
    };

    onSubmit(transformedData);
  };

  const findPermissionId = useCallback(
    (permissionName: string): number | undefined => {
      const permission = permissions?.find((p: Permission) => p.name === permissionName);
      if (!permission) {
        console.warn(`Permission not found for name: ${permissionName}`);
      }
      return Number(permission?.id);
    },
    [permissions],
  );

  if (isLoadingGetPermissions || !permissions) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="permissionIds"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-5">
                {GROUP_PERMISSIONS_RAW.map((group) => (
                  <div className="flex flex-col gap-3" key={group.label}>
                    <p className="font-semibold">{group.label}</p>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                      {group.permissionOptions.map((permission) => {
                        const permissionId = findPermissionId(permission.value);
                        if (!permissionId) return null;

                        return (
                          <FormControl key={permission.value}>
                            <Label htmlFor={permission.value} className="flex items-center gap-2">
                              <Checkbox
                                id={permission.value}
                                checked={field.value?.includes(permissionId)}
                                onCheckedChange={(checked) => {
                                  if (permissionId === undefined) return;

                                  const newValue = checked
                                    ? [...(field.value || []), permissionId]
                                    : field.value?.filter((id) => id !== permissionId) || [];

                                  field.onChange(newValue);
                                }}
                              />
                              {permission.label}
                            </Label>
                          </FormControl>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-max" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormRole;

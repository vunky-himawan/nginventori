"use client";

import { useCallback } from "react";
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
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { GROUP_PERMISSIONS_RAW } from "../_constants/group-permissions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGetPermissionsOptions } from "@/hooks/data/form-options/use-get-permissions-options";
import { Loading } from "@/components/ui/loading/main";
import { Permission } from "@prisma/client";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isLoading: boolean;
}

const FormRole = <T extends FieldValues>({ form, onSubmit, isLoading }: FormProps<T>) => {
  const { data: permissions, isLoading: isLoadingGetPermissions } = useGetPermissionsOptions();

  const permissionIds = form.watch("permissionIds" as Path<T>) || [];

  const handleSubmit = (data: T) => {
    const transformedData = {
      ...data,
      permissionIds: data.permissionIds.map((id: string | number) => Number(id)),
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

  const isFullAccess = permissions.length > 0 && permissionIds.length === permissions.length;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        {/* Field Name */}
        <FormField
          name={"name" as Path<T>}
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

        {/* Checkbox Full Access */}
        <FormItem className="flex flex-row items-center space-x-2">
          <Checkbox
            id="full-access"
            checked={isFullAccess}
            onCheckedChange={(checked) => {
              if (checked) {
                const allPermissionIds = permissions.map((p: Permission) => Number(p.id));
                form.setValue("permissionIds" as Path<T>, allPermissionIds);
              } else {
                form.setValue("permissionIds" as Path<T>, [] as PathValue<T, Path<T>>);
              }
            }}
          />
          <Label htmlFor="full-access">Full Access</Label>
        </FormItem>

        {/* Field PermissionIds */}
        <FormField
          name={"permissionIds" as Path<T>}
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
                                    : (field.value || []).filter(
                                        (id: number) => id !== permissionId,
                                      );

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

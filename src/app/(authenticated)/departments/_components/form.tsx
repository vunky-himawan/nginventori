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
import { TCreateOrUpdateDepartmentValidation } from "@/server/departments/validation/create-update-validation";

type FormProps = {
  form: UseFormReturn<TCreateOrUpdateDepartmentValidation>;
  onSubmit: (data: TCreateOrUpdateDepartmentValidation) => void;
  isLoading: boolean;
};

const FormDepartment = ({ form, onSubmit, isLoading }: FormProps) => {
  const handleSubmit = (data: TCreateOrUpdateDepartmentValidation) => {
    onSubmit(data);
  };

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
        <Button type="submit" className="w-max" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormDepartment;

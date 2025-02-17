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
import { TCreateOrUpdateEmployeePositionValidation } from "@/server/employee-positions/validation/create-validation";

type FormProps = {
  form: UseFormReturn<TCreateOrUpdateEmployeePositionValidation>;
  onSubmit: (data: TCreateOrUpdateEmployeePositionValidation) => void;
  isLoading: boolean;
};

const FormEmployeePosition = ({ form, onSubmit, isLoading }: FormProps) => {
  const handleSubmit = (data: TCreateOrUpdateEmployeePositionValidation) => {
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

export default FormEmployeePosition;

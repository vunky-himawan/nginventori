"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { TCreateOrUpdateOfficeLocationValidation } from "@/server/office-locations/validation/create-validation";
import { UseFormReturn } from "react-hook-form";

type FormProps = {
  form: UseFormReturn<TCreateOrUpdateOfficeLocationValidation>;
  onSubmit: (data: TCreateOrUpdateOfficeLocationValidation) => void;
  isLoading: boolean;
};
const FormOfficeLocation = ({ form, onSubmit, isLoading }: FormProps) => {
  const handleSubmit = (data: TCreateOrUpdateOfficeLocationValidation) => {
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
export default FormOfficeLocation;

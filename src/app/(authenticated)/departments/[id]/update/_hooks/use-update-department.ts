import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateDepartmentValidation } from "@/server/departments/validation/create-update-validation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDepartment = ({ id }: { id: number }) => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  return useMutation({
    mutationKey: ["update-department"],
    mutationFn: async (data: TCreateOrUpdateDepartmentValidation) => {
      await api.put(`/departments/${id}`, data);
    },
    onSuccess: () => {
      showSuccessToast("Department updated successfully", "/departments");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

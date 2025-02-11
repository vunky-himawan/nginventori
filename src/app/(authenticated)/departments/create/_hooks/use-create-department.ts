import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateDepartmentValidation } from "@/server/departments/validation/create-update-validation";
import { useMutation } from "@tanstack/react-query";

export const useCreateDepartment = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  return useMutation({
    mutationKey: ["create-department"],
    mutationFn: async (data: TCreateOrUpdateDepartmentValidation) => {
      await api.post("/departments", data);
    },
    onSuccess: () => {
      showSuccessToast("Department created successfully", "/departments");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateEmployeePositionValidation } from "@/server/employee-positions/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useCreateEmployeePosition = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  return useMutation({
    mutationKey: ["create-employee-position"],
    mutationFn: async (data: TCreateOrUpdateEmployeePositionValidation) => {
      await api.post("/employee-positions", data);
    },
    onSuccess: () => {
      showSuccessToast("Employee position created successfully", "/employee-positions");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

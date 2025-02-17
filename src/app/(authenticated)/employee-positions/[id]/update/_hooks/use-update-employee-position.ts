import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateEmployeePositionValidation } from "@/server/employee-positions/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateEmployeePosition = ({ id }: { id: number }) => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  return useMutation({
    mutationKey: ["update-employee-position"],
    mutationFn: async (data: TCreateOrUpdateEmployeePositionValidation) => {
      await api.put(`/employee-positions/${id}`, data);
    },
    onSuccess: () => {
      showSuccessToast("Employee position updated successfully", "/employee-positions");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

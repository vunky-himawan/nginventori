import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateRoleValidation } from "@/server/roles/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateRole = ({ id }: { id: number }) => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  return useMutation({
    mutationKey: ["update-role"],
    mutationFn: async (data: TCreateOrUpdateRoleValidation) => {
      await api.put(`/roles/${id}`, data);
    },
    onSuccess: () => {
      showSuccessToast("Role updated successfully", "/roles");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateRoleValidation } from "@/server/roles/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useCreateRole = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();

  return useMutation({
    mutationKey: ["create-role"],
    mutationFn: async (data: TCreateOrUpdateRoleValidation) => {
      await api.post("/roles", data);
    },
    onSuccess: () => {
      showSuccessToast("Role created successfully", "/roles");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

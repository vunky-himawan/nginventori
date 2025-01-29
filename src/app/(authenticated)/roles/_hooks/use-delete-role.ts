import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRole = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-role"],
    mutationFn: async (id: number) => {
      await api.delete(`/roles/${id}`);
    },
    onSuccess: () => {
      showSuccessToast("Role deleted successfully");

      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error) => {
      console.error("Error deleting role:", error);
      showErrorToast(error);
    },
  });
};

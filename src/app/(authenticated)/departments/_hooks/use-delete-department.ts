import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDepartment = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-department"],
    mutationFn: async (id: number) => {
      await api.delete(`/departments/${id}`);
    },
    onSuccess: () => {
      showSuccessToast("Department deleted Succesfully");

      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

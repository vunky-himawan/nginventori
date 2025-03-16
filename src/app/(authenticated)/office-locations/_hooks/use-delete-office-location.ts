import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteOfficeLocation = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-office-location"],
    mutationFn: async (id: number) => {
      await api.delete(`/office-locations/${id}`);
    },
    onSuccess: () => {
        showSuccessToast("Office Location deleted Succesfully");

        queryClient.invalidateQueries({ queryKey: ["office-locations"] });
    },
    onError: (error) => {
        showErrorToast(error);
    }
  });
};

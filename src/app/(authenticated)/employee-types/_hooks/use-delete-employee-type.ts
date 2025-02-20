import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployeeType = () => {
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-employee-type"],
    mutationFn: async (id: number) => {
      await api.delete(`/employee-types/${id}`);
    },
    onSuccess: () => {
        showSuccessToast("Employee Type deleted Succesfully");

        queryClient.invalidateQueries({ queryKey: ["employee-types"] });
    },
    onError: (error) => {
        showErrorToast(error);
    }
  });
};

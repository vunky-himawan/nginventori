import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployeePosition = () => {
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["delete-employee-position"],
        mutationFn: async (id: number) => {
            await api.delete(`/employee-positions/${id}`);
        },
        onSuccess: () => {
            showSuccessToast("Employee Position deleted Succesfully");

            queryClient.invalidateQueries({ queryKey: ["employee-positions"] });
        }, 
        onError: (error) => {
            showErrorToast(error);
        }
    })
}
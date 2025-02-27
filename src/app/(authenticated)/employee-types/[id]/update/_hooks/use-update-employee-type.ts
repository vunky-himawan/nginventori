import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateEmployeeTypeValidation } from "@/server/employee-types/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateEmployeeType = ({ id }: { id: number }) => {
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    return useMutation({
        mutationKey: ["update-employee-type"],
        mutationFn: async (data: TCreateOrUpdateEmployeeTypeValidation) => {
            await api.put(`/employee-types/${id}`, data);
        },
        onSuccess: () => {
            showSuccessToast("Employee type updated successfully", "/employee-types");
        },
        onError: (error) => {
            showErrorToast(error);
        }
    })
}
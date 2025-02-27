import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateEmployeeTypeValidation } from "@/server/employee-types/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useCreateEmployeeType = () => {
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    return useMutation({
        mutationKey: ["create-employee-type"],
        mutationFn: async (data: TCreateOrUpdateEmployeeTypeValidation) => {
            await api.post("/employee-types", data);
        },
        onSuccess: () => {
            showSuccessToast("Employee type created successfully", "/employee-types");
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });
};
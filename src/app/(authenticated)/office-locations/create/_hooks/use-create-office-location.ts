import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateOfficeLocationValidation } from "@/server/office-locations/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useCreateOfficeLocation = () => {
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    return useMutation({
        mutationKey: ["create-office-location"],
        mutationFn: async (data: TCreateOrUpdateOfficeLocationValidation) => {
            await api.post("/office-locations", data);
        },
        onSuccess: () => {
            showSuccessToast("Office Location created successfully", "/office-locations");
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });
};
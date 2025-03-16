import { useErrorToast } from "@/hooks/toast/use-show-error-toast";
import { useSuccessToast } from "@/hooks/toast/use-show-success-toast";
import { api } from "@/libs/axios/axios";
import { TCreateOrUpdateOfficeLocationValidation } from "@/server/office-locations/validation/create-validation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateOfficeLocation = ({ id }: { id: number }) => {
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    return useMutation({
        mutationKey: ["update-employee-type"],
        mutationFn: async (data: TCreateOrUpdateOfficeLocationValidation) => {
            await api.put(`/office-locations/${id}`, data);
        },
        onSuccess: () => {
            showSuccessToast("Office Location updated successfully", "/office-locations");
        },
        onError: (error) => {
            showErrorToast(error);
        }
    })
}
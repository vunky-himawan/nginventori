import { toast } from "@/app/_components/ui/toast/main";
import { AxiosError } from "axios";

export const useErrorToast = () => {
  return (error: unknown, defaultMessage = "An error occurred. Please try again!") => {
    if (error instanceof AxiosError) {
      toast({
        title: `${error.response?.statusText || defaultMessage}`,
        type: "error",
      });
    } else {
      toast({
        title: defaultMessage,
        type: "error",
      });
    }
  };
};

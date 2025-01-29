import { toast } from "@/app/_components/ui/toast/main";
import { useRouter } from "next/navigation";

export const useSuccessToast = () => {
  const router = useRouter();

  return (message: string, redirectUrl?: string) => {
    toast({
      title: message,
      type: "success",
    });

    if (redirectUrl) {
      router.replace(redirectUrl);
    }
  };
};

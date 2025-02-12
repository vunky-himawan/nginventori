import { api } from "@/libs/axios/axios";
import { UserAuthMe } from "@/libs/prisma/types/user/user-auth-me";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthMe = () => {
  return useQuery<UserAuthMe>({
    queryKey: ["auth/me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");

      return extractJsonData(response);
    },
  });
};

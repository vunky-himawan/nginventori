import { api } from "@/libs/axios/axios";
import { RoleWithPermissions } from "@/libs/prisma/types/role-with-permissions";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

export const useGetRole = (id: number) => {
  return useQuery<RoleWithPermissions>({
    queryKey: ["role", id],
    queryFn: async () => {
      const response = await api.get(`/roles/${id}`);

      return extractJsonData(response);
    },
    refetchOnWindowFocus: false,
  });
};

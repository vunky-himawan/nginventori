import { api } from "@/libs/axios/axios";
import { extractJsonData } from "@/utils/extract-json-data";
import { OfficeLocation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetOfficeLocation = (id: number) => {
    return useQuery<OfficeLocation>({
        queryKey: ["office-locations", id],
        queryFn: async () => {
            const response = await api.get(`/office-locations/${id}`)
            return extractJsonData(response)
        },
        refetchOnWindowFocus: false,
    });
};
import { api } from "@/libs/axios/axios";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationMeta } from "@/types/meta";
import { extractJsonData } from "@/utils/extract-json-data";
import { OfficeLocation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type OfficeLocationResponse = {
    data: OfficeLocation[];
    meta: TPaginationMeta;
};

export const useGetOfficeLocations = (queryParams: TIndexQueryParam) => {
    return useQuery<OfficeLocationResponse>({
        queryKey: ["office-locations", queryParams],
        queryFn: async () => {
            const response = await api.get("/office-locations", {
                params: queryParams,
            });

            return extractJsonData(response);
        }
    })
}
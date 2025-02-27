import { api } from "@/libs/axios/axios";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationMeta } from "@/types/meta";
import { extractJsonData } from "@/utils/extract-json-data";
import { EmployeeType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type EmployeeTypeResponse = {
    data: EmployeeType[];
    meta: TPaginationMeta;
};

export const useGetEmployeeTypes = (queryParams: TIndexQueryParam) => {
    return useQuery<EmployeeTypeResponse>({
        queryKey: ["employee-types", queryParams],
        queryFn: async () => {
            const response = await api.get("/employee-types", {
                params: queryParams,
            });

            return extractJsonData(response);
        }
    })
}
import { api } from "@/libs/axios/axios";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationMeta } from "@/types/meta";
import { extractJsonData } from "@/utils/extract-json-data";
import { EmployeePosition } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type EmployeePositionResponse = {
    data: EmployeePosition[];
    meta: TPaginationMeta;
};

export const useGetEmployeePositions = (queryParams: TIndexQueryParam) => {
    return useQuery<EmployeePositionResponse>({
        queryKey: ["employee-positions", queryParams],
        queryFn: async () => {
            const response = await api.get("/employee-positions", {
                params: queryParams,
            });

            return extractJsonData(response);
        }
    })
}
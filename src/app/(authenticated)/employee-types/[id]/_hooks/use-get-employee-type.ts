import { api } from "@/libs/axios/axios";
import { extractJsonData } from "@/utils/extract-json-data";
import { EmployeeType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeType = (id: number) => {
    return useQuery<EmployeeType>({
        queryKey: ["employee-types", id],
        queryFn: async () => {
            const response = await api.get(`/employee-types/${id}`)
            return extractJsonData(response)
        },
        refetchOnWindowFocus: false,
    });
};
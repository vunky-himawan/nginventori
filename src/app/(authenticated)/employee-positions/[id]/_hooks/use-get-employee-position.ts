import { api } from "@/libs/axios/axios";
import { extractJsonData } from "@/utils/extract-json-data";
import { EmployeePosition } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export const useGetEmployeePosition = (id: number) => {
    return useQuery<EmployeePosition>({
        queryKey: ["employee-positions", id],
        queryFn: async () => {
            const response = await api.get(`/employee-positions/${id}`)
            return extractJsonData(response)
        },
        refetchOnWindowFocus: false,
    });
};
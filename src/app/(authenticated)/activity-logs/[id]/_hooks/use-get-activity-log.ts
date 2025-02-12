import { api } from "@/libs/axios/axios";
import { ActivityLogWithActor } from "@/libs/prisma/types/activity-logs-with-actor";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityLog = (id: number) => {
  return useQuery<ActivityLogWithActor>({
    queryKey: ["activity-logs", id],
    queryFn: async () => {
      const response = await api.get(`/activity-logs/${id}`);

      return extractJsonData(response);
    },
    refetchOnWindowFocus: false,
  });
};

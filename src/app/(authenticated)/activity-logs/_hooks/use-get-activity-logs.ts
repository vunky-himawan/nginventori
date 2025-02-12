import { api } from "@/libs/axios/axios";
import { ActivityLogWithActor } from "@/libs/prisma/types/activity-logs-with-actor";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationMeta } from "@/types/meta";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

type ActivityLogsResponse = {
  data: ActivityLogWithActor[];
  meta: TPaginationMeta;
};

export const useGetActivityLogs = (queryParams: TIndexQueryParam) => {
  return useQuery<ActivityLogsResponse>({
    queryKey: ["activity-logs", queryParams],
    queryFn: async () => {
      const response = await api.get("/activity-logs", {
        params: queryParams,
      });

      return extractJsonData(response);
    },
  });
};

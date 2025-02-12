import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { ActivityLog, Prisma } from "@prisma/client";
import prisma from "@/libs/prisma/prisma";
import { convertPaginationMeta } from "@/utils/datatables/pagination";
import { CreateActivityLogDto } from "../dto/create-activity-log-dto";
import { getUserWithPermissions } from "@/server/users/repository/user-repository";
import { auth } from "@clerk/nextjs/server";
import UnauthorizedException from "@/errors/UnauthorizedException";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";

export const getActivityLogs = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<ActivityLog[]>> => {
  const [data, meta] = await prisma.activityLog
    .paginate({
      include: {
        actor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      where: {
        ...(queryParams.search
          ? {
              logName: {
                contains: queryParams.search,
                mode: "insensitive",
              },
              actor: {
                name: {
                  contains: queryParams.search,
                  mode: "insensitive",
                },
                email: {
                  contains: queryParams.search,
                  mode: "insensitive",
                },
              },
            }
          : {}),
      },
      orderBy: {
        ...(queryParams.sort && queryParams.order
          ? {
              [queryParams.sort]: queryParams.order,
            }
          : {
              createdAt: "desc",
            }),
      },
    })
    .withPages({
      page: queryParams.page,
      limit: queryParams.perPage,
    });

  return {
    data,
    meta: convertPaginationMeta(meta, queryParams),
  };
};

export const getActivityLog = async (id: number) => {
  return await prisma.activityLog.findUnique({
    where: { id },
    include: {
      actor: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

export const createActivityLog = async (
  data: CreateActivityLogDto,
): Promise<ActivityLog | null> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new UnauthorizedException("Unauthorized");
    }

    const user = await getUserWithPermissions(userId);

    return await prisma.activityLog.create({
      data: {
        action: data.action,
        description: data.description,
        subjectType: data.subjectType,
        properties: data.properties || Prisma.JsonNull,
        logName: data.logName,
        actorId: user.user.id,
      },
    });
  } catch (error) {
    console.error("[ActivityLogsRepository] Error creating activity log", error);
    throw new Error("Error creating activity log");
  }
};

export const getLatestLoginActivityLog = async (clerkId: string) => {
  return await prisma.activityLog.findFirst({
    where: {
      action: ACTIVITY_LOG_ACTION_ENUM.LOGIN,
      actor: {
        clerkId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getLatestLogoutActivityLog = async (clerkId: string) => {
  return await prisma.activityLog.findFirst({
    where: {
      action: ACTIVITY_LOG_ACTION_ENUM.LOGOUT,
      actor: {
        clerkId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

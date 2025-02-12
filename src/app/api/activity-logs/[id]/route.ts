import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { getActivityLogAction } from "@/server/activity-logs/action/activity-logs-action";
import { NextRequest } from "next/server";

// GET /activity-logs/:id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (isNaN(Number(id))) throw new BadRequestException("Invalid activity log ID");

    const data = await getActivityLogAction(Number(id));

    return new SuccessResponse(data, "Activity log retrieved successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
}

import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import {
  createDepartmentAction,
  getDepartmentsAction,
} from "@/server/departments/actions/department-action";
import { TIndexQueryParam } from "@/types/index-query-param";
import { transformRequest } from "@/utils/transform-request";
import { NextRequest } from "next/server";

// GET /departments
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const transformedRequest = transformRequest<TIndexQueryParam>(searchParams);

    const departments = await getDepartmentsAction(transformedRequest);

    return new SuccessResponse(departments, "Success");
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};

// POST /departments/create
export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();

    const data = await createDepartmentAction({ name });

    return new SuccessResponse(data, "Department created successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
};

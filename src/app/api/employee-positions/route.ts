import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import {
  createEmployeePositionAction,
  getEmployeePositionsAction,
} from "@/server/employee-positions/actions/employee-position-action";
import { TIndexQueryParam } from "@/types/index-query-param";
import { transformRequest } from "@/utils/transform-request";
import { NextRequest } from "next/server";

// GET /employee-positions
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    const transformedRequest = transformRequest<TIndexQueryParam>(searchParams);
    
    const employeePositions = await getEmployeePositionsAction(transformedRequest);
    
    return new SuccessResponse(employeePositions, "Succes");
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};

//  POST /employee-positions/create
export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();

    const data = await createEmployeePositionAction({ name });
    return new SuccessResponse(data, "Employee Position created successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server Error");
  }
};

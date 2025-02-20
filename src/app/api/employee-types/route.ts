import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { createEmployeeTypeAction, getEmployeeTypesAction } from "@/server/employee-types/actions/employee-type-action";
import { TIndexQueryParam } from "@/types/index-query-param";
import { transformRequest } from "@/utils/transform-request";
import { NextRequest } from "next/server";

// GET /employee-Types
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    const transformedRequest = transformRequest<TIndexQueryParam>(searchParams);
    
    const employeeTypes = await getEmployeeTypesAction(transformedRequest);
    
    return new SuccessResponse(employeeTypes, "Success");
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};

//  POST /employee-types/create
export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();

    const data = await createEmployeeTypeAction({ name });
    return new SuccessResponse(data, "Employee Type created successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server Error");
  }
};

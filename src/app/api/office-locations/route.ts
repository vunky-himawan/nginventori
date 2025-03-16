import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { createOfficeLocationAction, getOfficeLocationsAction } from "@/server/office-locations/actions/office-location-action";
import { TIndexQueryParam } from "@/types/index-query-param";
import { transformRequest } from "@/utils/transform-request";
import { NextRequest } from "next/server";

// GET /office-locations
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    const transformedRequest = transformRequest<TIndexQueryParam>(searchParams);
    
    const officeLocations = await getOfficeLocationsAction(transformedRequest);
    
    return new SuccessResponse(officeLocations, "Success");
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};

//  POST /office-locations/create
export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();

    const data = await createOfficeLocationAction({ name });
    return new SuccessResponse(data, "Office Location created successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server Error");
  }
};

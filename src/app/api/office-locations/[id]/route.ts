import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { deleteOfficeLocationAction, getOfficeLocationAction, updateOfficeLocationAction} from "@/server/office-locations/actions/office-location-action";

import { NextRequest } from "next/server";

// GET /office-location/:id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Office Location ID");

    const data = await getOfficeLocationAction(Number(id));

    return new SuccessResponse(data, "Office Location retrived server");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}


export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (isNaN(Number(id))) throw new BadRequestException("Invalid Office Location ID");
    const { name } = await req.json();
    const data = await updateOfficeLocationAction(Number(id), { name });

    return new SuccessResponse(data, "Office Location Updated Successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}

// DELETE 
export async function DELETE(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Office Location ID");
    const data = await deleteOfficeLocationAction(Number(id));

    return new SuccessResponse(data, "Office Location Deleted Succesfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}

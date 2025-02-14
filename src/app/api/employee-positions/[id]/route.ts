import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import {
    deleteEmployeePositionAction,
  getEmployeePositionAction,
  updateEmployeePositionAction,
} from "@/server/employee-positions/actions/employee-position-action";
import { NextRequest } from "next/server";

// GET /employee-position/:id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Employee Position ID");

    const data = await getEmployeePositionAction(Number(id));

    return new SuccessResponse(data, "Employee Position retrived server");
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

    if (isNaN(Number(id))) throw new BadRequestException("Invalid Employee Position ID");
    const { name } = await req.json();
    const data = await updateEmployeePositionAction(Number(id), { name });

    return new SuccessResponse(data, "Employee Position Updated Successfully");
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
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Employee Position ID");
    console.log(id);
    const data = await deleteEmployeePositionAction(Number(id));

    return new SuccessResponse(data, "Employee Position Deleted Succesfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}

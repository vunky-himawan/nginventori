import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { deleteEmployeeTypeAction, getEmployeeTypeAction, updateEmployeeTypeAction } from "@/server/employee-types/actions/employee-type-action";

import { NextRequest } from "next/server";

// GET /employee-type/:id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Employee Type ID");

    const data = await getEmployeeTypeAction(Number(id));

    return new SuccessResponse(data, "Employee Type retrived server");
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

    if (isNaN(Number(id))) throw new BadRequestException("Invalid Employee Type ID");
    const { name } = await req.json();
    const data = await updateEmployeeTypeAction(Number(id), { name });

    return new SuccessResponse(data, "Employee Type Updated Successfully");
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
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Employee Type ID");
    const data = await deleteEmployeeTypeAction(Number(id));

    return new SuccessResponse(data, "Employee Type Deleted Succesfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}

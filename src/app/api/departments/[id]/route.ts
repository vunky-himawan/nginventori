// GET /department/:id

import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import {
  deleteDepartmentAction,
  getDepartmentAction,
  updateDepartmentAction,
} from "@/server/departments/actions/department-action";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Department ID");

    const data = await getDepartmentAction(Number(id));

    return new SuccessResponse(data, "Department retrived server");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (isNaN(Number(id))) throw new BadRequestException("Invalid Department ID");
    const { name } = await req.json();
    const data = await updateDepartmentAction(Number(id), { name });
    return new SuccessResponse(data, "Department Updated Succesfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}

export async function DELETE(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (isNaN(Number(id))) throw new BadRequestException("Invalid Department ID");
    console.log(id);
    const data = await deleteDepartmentAction(Number(id));

    return new SuccessResponse(data, "Department Deleted Succesfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal Server error");
  }
}

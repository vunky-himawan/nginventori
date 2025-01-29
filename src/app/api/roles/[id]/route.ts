import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import {
  deleteRoleAction,
  getRoleAction,
  updateRoleAction,
} from "@/server/roles/actions/role-action";
import { NextRequest } from "next/server";

// GET /roles/:id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (isNaN(Number(id))) throw new BadRequestException("Invalid role ID");

    const data = await getRoleAction(Number(id));

    return new SuccessResponse(data, "Role retrieved successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
}

// PUT /roles/:id
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (isNaN(Number(id))) throw new BadRequestException("Invalid role ID");

    const { name, permissionIds } = await req.json();

    const data = await updateRoleAction(Number(id), { name, permissionIds });

    return new SuccessResponse(data, "Role updated successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
}

// DELETE /roles/:id
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (isNaN(Number(id))) throw new BadRequestException("Invalid role ID");

    const data = await deleteRoleAction(Number(id));

    return new SuccessResponse(data, "Role deleted successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
}

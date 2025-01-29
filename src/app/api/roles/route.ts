import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { createRoleAction, getRolesAction } from "@/server/roles/actions/role.action";
import { transformRequest } from "@/utils/transform-request";
import { NextRequest } from "next/server";

// GET /roles
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const roles = await getRolesAction(transformRequest(searchParams));

    return new SuccessResponse(roles, "Success");
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};

// POST /roles/create
export const POST = async (req: NextRequest) => {
  try {
    const { name, permissionIds } = await req.json();

    const data = await createRoleAction({ name, permissionIds });

    return new SuccessResponse(data, "Role created successfully");
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException("Internal server error");
  }
};

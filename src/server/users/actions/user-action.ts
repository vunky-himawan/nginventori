"use server";

import InternalServerErrorException from "@/errors/InternalServerErrorException";
import NotFoundException from "../../../errors/NotFoundException";
import {
  getUserByClerkId,
  getUserByEmail,
  getUserWithPermissions,
} from "../repository/user-repository";

export const getUserByEmailAction = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[getUserByEmailAction] Error while getting user by email", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const getUserWithPermissionsAction = async (clerkId: string) => {
  try {
    const user = await getUserWithPermissions(clerkId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[getUserWithPermissionsAction] Error while getting user with permissions", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const getUserByClerkIdAction = async (clerkId: string) => {
  try {
    const user = await getUserByClerkId(clerkId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException("User not found");
    }
    console.log("[getUserByClerkIdAction] Error while getting user by clerk id", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

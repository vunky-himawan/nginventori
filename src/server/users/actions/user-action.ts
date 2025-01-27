"use server";

import NotFoundException from "../../../errors/NotFoundException";
import { getUserByEmail, getUserWithPermissions } from "../repository/user-repository";

export const getUserByEmailAction = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return user;
};

export const getUserWithPermissionsAction = async (clerkId: string) => {
  const user = await getUserWithPermissions(clerkId);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return user;
};

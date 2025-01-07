"use server";

import NotFoundException from "../../../errors/NotFoundException";
import { getUserByEmail } from "../repository/user-repository";

export const getUserByEmailAction = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return user;
};

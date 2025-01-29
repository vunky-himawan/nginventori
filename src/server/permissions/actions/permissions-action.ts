import { getPermissions } from "../repository/permissions-repository";

export const getPermissionsAction = async () => {
  return await getPermissions();
};

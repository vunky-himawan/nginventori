import { auth } from "@clerk/nextjs/server";
import { hasAllElements, hasCommonElements } from "./function";
import UnauthorizedException from "@/errors/UnauthorizedException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { getUserWithPermissionsAction } from "@/server/users/actions/user-action";
import ForbiddenException from "@/errors/ForbiddenException";

type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions?: Array<string>;
  customCondition?: boolean;
};

/**
 * Checks if the user has all the required permissions on the client side.
 *
 * @param {Object} params - The parameters for the permission check.
 * @param {string[]} params.permissions - The required permissions.
 * @param {string[]} params.userPermissions - The user's permissions.
 * @param {boolean} [params.customCondition=true] - An optional custom condition that must also be met.
 * @returns {boolean} - Returns `true` if the user has all the required permissions and meets the custom condition, otherwise `false`.
 *
 * @example
 * ```typescript
 * const permissions = ['read', 'write'];
 * const userPermissions = ['read', 'write', 'delete'];
 * const customCondition = true;
 * const hasAccess = clientCheckPermissions({ permissions, userPermissions, customCondition });
 * console.log(hasAccess); // Output: true
 * ```
 */
export const clientCheckPermissions = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasAllPermissions = hasAllElements(permissions, userPermissions);
  return hasAllPermissions && customCondition;
};

/**
 * Checks if the user has the required permissions and meets a custom condition.
 *
 * @param {Object} params - The parameters for the permission check.
 * @param {string[]} params.permissions - The required permissions.
 * @param {string[]} params.userPermissions - The user's permissions.
 * @param {boolean} [params.customCondition=true] - An optional custom condition that must also be met.
 * @returns {boolean} - Returns `true` if the user has the required permissions and meets the custom condition, otherwise `false`.
 *
 * @example
 * const permissions = ['read', 'write'];
 * const userPermissions = ['read', 'delete'];
 * const customCondition = true;
 * const hasAccess = checkPermission({ permissions, userPermissions, customCondition });
 * console.log(hasAccess); // Output: true
 */
export const checkPermission = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasPermission = hasCommonElements(permissions, userPermissions);
  return hasPermission && customCondition;
};

export const serverCheckPermissions = async (allowedPermissions: string[]) => {
  const { userId } = await auth();

  if (!userId) {
    return new UnauthorizedException("Unauthorized");
  }

  try {
    const user = await getUserWithPermissionsAction(userId);

    if (!user) {
      return new UnauthorizedException("Unauthorized");
    }

    const hasPermission = hasCommonElements(allowedPermissions, user.permissions);

    if (!hasPermission) {
      return new ForbiddenException("Forbidden");
    }

    return true;
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};

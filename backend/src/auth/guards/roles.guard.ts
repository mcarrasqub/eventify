// External Imports
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// Internal Imports
import { ROLES_KEY } from "../decorators/roles.decorator";
import type { User } from "../../users/entities/user.entity";

// Guard Definition
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      ("admin" | "user")[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException("Access denied: User role not identified");
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: Requires one of the following roles: [${requiredRoles.join(", ")}]`,
      );
    }

    return true;
  }
}

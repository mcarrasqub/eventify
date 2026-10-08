// External Imports
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

// Internal Imports
import type { User } from "../../users/entities/user.entity";
import { UsersService } from "../../users/users.service";

// Interface for JWT Payload
export interface JwtPayload {
  sub: number;
  email: string;
  role: "admin" | "user";
}

// Strategy Definition
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ||
        "eventify_super_secret_jwt_key_2026_change_in_production",
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    try {
      return await this.usersService.findById(payload.sub);
    } catch {
      throw new UnauthorizedException("Invalid token or user does not exist");
    }
  }
}

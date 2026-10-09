// External Imports
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

// Internal Imports
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthValidator } from "./auth.validator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RolesGuard } from "./guards/roles.guard";
import { UsersModule } from "../users/users.module";

// Module Definition
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>("JWT_SECRET") ??
          "eventify_super_secret_jwt_key_2026_change_in_production",
        signOptions: {
          expiresIn: (configService.get<string>("JWT_EXPIRATION") ?? "24h") as
            `${number}${"s" | "m" | "h" | "d"}` | number,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthValidator,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthService,
    AuthValidator,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule {}

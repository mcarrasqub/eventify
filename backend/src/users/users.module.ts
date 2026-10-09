// External Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Internal Imports
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersValidator } from "./users.validator";

// Module Definition
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersValidator],
  exports: [UsersService, UsersValidator, TypeOrmModule],
})
export class UsersModule {}

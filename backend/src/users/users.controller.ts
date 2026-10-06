// Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

// Controller Definition
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getProfile(@CurrentUser() user: User): Omit<User, "password"> {
    const { password: _, ...userProfile } = user;
    return userProfile as Omit<User, "password">;
  }

  @Post()
  @Roles("admin")
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles("admin")
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return await this.usersService.findById(Number(id));
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(":id")
  @Roles("admin")
  async remove(@Param("id") id: string): Promise<void> {
    return await this.usersService.remove(Number(id));
  }
}

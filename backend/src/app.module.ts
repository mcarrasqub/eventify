// External Imports
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Internal Imports
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RolesGuard } from "./auth/guards/roles.guard";
import { SeedModule } from "./database/seeds/seed.module";
import { TicketsModule } from "./tickets/tickets.module";
import { UsersModule } from "./users/users.module";
import { VenuesModule } from "./venues/venues.module";

// Module Definition
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.SQLITE_PATH ?? "database.sqlite",
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    EventsModule,
    SeedModule,
    TicketsModule,
    UsersModule,
    VenuesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
})
export class AppModule {}

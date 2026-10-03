// Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/entities/event.entity';
import { InitialMigration1700000000000 } from './migrations/1700000000000-InitialMigration';
import { Ticket } from './tickets/entities/ticket.entity';
import { User } from './users/entities/user.entity';
import { Venue } from './venues/entities/venue.entity';

// Module Definition
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_PATH ?? './database.sqlite',
      entities: [User, Venue, Event, Ticket],
      migrations: [InitialMigration1700000000000],
      migrationsRun: true, // Automatically applies pending migrations on startup
      synchronize: false, // Strict migration mode enabled
      logging: false,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

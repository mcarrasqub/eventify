// Imports
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import { Event } from './events/entities/event.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { User } from './users/entities/user.entity';
import { Venue } from './venues/entities/venue.entity';

// DataSource Configuration
export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.SQLITE_PATH ?? './database.sqlite',
  entities: [User, Venue, Event, Ticket],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;

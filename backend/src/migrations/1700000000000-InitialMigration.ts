// Imports
import type { MigrationInterface, QueryRunner } from 'typeorm';

// Migration Definition
export class InitialMigration1700000000000 implements MigrationInterface {
  name = 'InitialMigration1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "name" varchar NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "role" varchar NOT NULL DEFAULT ('user'),
        "phone" varchar,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
      )
    `);

    // 2. Create venues table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "venues" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "imageURL" varchar,
        "name" varchar NOT NULL,
        "city" varchar NOT NULL,
        "address" varchar NOT NULL,
        "capacity" integer NOT NULL,
        "latitude" float,
        "longitude" float,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
      )
    `);

    // 3. Create events table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "events" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "imageURL" varchar NOT NULL,
        "title" varchar NOT NULL,
        "description" text NOT NULL,
        "type" varchar NOT NULL,
        "category" varchar NOT NULL,
        "date" varchar NOT NULL,
        "time" varchar NOT NULL,
        "duration" varchar NOT NULL,
        "price" float NOT NULL,
        "status" varchar NOT NULL DEFAULT ('Active'),
        "venueId" integer NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        CONSTRAINT "FK_event_venue" FOREIGN KEY ("venueId") REFERENCES "venues" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    // 4. Create tickets table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tickets" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "status" varchar NOT NULL DEFAULT ('Valid'),
        "eventId" integer NOT NULL,
        "userId" integer NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        CONSTRAINT "FK_ticket_event" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_ticket_user" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    // 5. Initial Seed Data
    // Users
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "role", "phone") VALUES (?, ?, ?, ?, ?)`,
      [
        'Administrador Principal',
        'admin@eventify.com',
        '$2b$10$zcOfRggNDFmNC14BVWRfwuTftt4iSEtmrHcf.bGCig0Erw.yVq2lO',
        'admin',
        '3001234567',
      ],
    );
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "role", "phone") VALUES (?, ?, ?, ?, ?)`,
      [
        'Juan Perez',
        'user@eventify.com',
        '$2b$10$JIrdP/cj0Ci3nqTO.x7WL.6vHwBveet9rshqXkBWAMZfiMA18nYPm',
        'user',
        '3009876543',
      ],
    );

    // Venues
    await queryRunner.query(
      `INSERT INTO "venues" ("name", "city", "address", "capacity", "imageURL", "latitude", "longitude") VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'Teatro Metropolitano',
        'Medellin',
        'Calle 41 # 57-30',
        1500,
        'https://images.unsplash.com/photo-1514306191717-452ec28c7814',
        6.2442,
        -75.5812,
      ],
    );
    await queryRunner.query(
      `INSERT INTO "venues" ("name", "city", "address", "capacity", "imageURL", "latitude", "longitude") VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'Plaza Mayor Centro de Convenciones',
        'Medellin',
        'Calle 41 # 55-80',
        3000,
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        6.2415,
        -75.5768,
      ],
    );

    // Events
    await queryRunner.query(
      `INSERT INTO "events" ("title", "description", "type", "category", "date", "time", "duration", "price", "status", "imageURL", "venueId") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Festival de Jazz & Blues 2026',
        'Un encuentro musical imperdible con artistas internacionales en vivo.',
        'Concierto',
        'Musica',
        '2026-11-15',
        '19:00',
        '3 horas',
        85000,
        'Active',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
        1,
      ],
    );
    await queryRunner.query(
      `INSERT INTO "events" ("title", "description", "type", "category", "date", "time", "duration", "price", "status", "imageURL", "venueId") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Tech Summit & Innovation Expo',
        'La conferencia de tecnologia, inteligencia artificial y startups mas grande del pais.',
        'Conferencia',
        'Tecnologia',
        '2026-12-05',
        '08:30',
        '8 horas',
        120000,
        'Active',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
        2,
      ],
    );
    await queryRunner.query(
      `INSERT INTO "events" ("title", "description", "type", "category", "date", "time", "duration", "price", "status", "imageURL", "venueId") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Obra de Teatro: La Comedia de la Vida',
        'Una puesta en escena brillante para reir y reflexionar en familia.',
        'Teatro',
        'Cultura',
        '2026-11-20',
        '20:00',
        '2 horas',
        45000,
        'Active',
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
        1,
      ],
    );

    // Tickets
    await queryRunner.query(`INSERT INTO "tickets" ("status", "eventId", "userId") VALUES (?, ?, ?)`, [
      'Valid',
      1,
      2,
    ]);
    await queryRunner.query(`INSERT INTO "tickets" ("status", "eventId", "userId") VALUES (?, ?, ?)`, [
      'Valid',
      1,
      2,
    ]);
    await queryRunner.query(`INSERT INTO "tickets" ("status", "eventId", "userId") VALUES (?, ?, ?)`, [
      'Valid',
      2,
      2,
    ]);
    await queryRunner.query(`INSERT INTO "tickets" ("status", "eventId", "userId") VALUES (?, ?, ?)`, [
      'Valid',
      3,
      1,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "tickets"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "events"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "venues"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}

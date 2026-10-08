// External Imports
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import type { OnApplicationBootstrap } from "@nestjs/common";
import { Repository } from "typeorm";

// Internal Imports
import { Event } from "../../events/entities/event.entity";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { User } from "../../users/entities/user.entity";
import { Venue } from "../../venues/entities/venue.entity";

// Service Definition
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seed();
  }

  async seed(): Promise<void> {
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      this.logger.log(
        "Database already contains records. Skipping initial seeding.",
      );
      return;
    }

    this.logger.log(
      "🌱 Database is empty. Seeding initial test data for Eventify...",
    );

    const saltRounds = 10;
    const adminPassword = await bcrypt.hash("admin123", saltRounds);
    const userPassword = await bcrypt.hash("user123", saltRounds);

    // 1. Seed Users (Admin & Regular User)
    const adminUser = await this.userRepository.save({
      name: "Mariana Carrasquilla",
      email: "admin@eventify.com",
      password: adminPassword,
      role: "admin",
      phone: "3001234567",
    });

    const normalUser = await this.userRepository.save({
      name: "Usuario Demo",
      email: "user@eventify.com",
      password: userPassword,
      role: "user",
      phone: "3009876543",
    });

    this.logger.log(
      `👤 Seeded 2 users: ${adminUser.email} (admin) and ${normalUser.email} (user)`,
    );

    // 2. Seed Venues
    const venue1 = await this.venueRepository.save({
      name: "Teatro Metropolitano",
      city: "Medellín",
      address: "Calle 41 # 57-30",
      capacity: 1600,
      latitude: 6.2413,
      longitude: -75.5768,
      imageURL: "https://images.unsplash.com/photo-1514306191717-452ec28c7814",
    });

    const venue2 = await this.venueRepository.save({
      name: "Plaza Mayor Medellín",
      city: "Medellín",
      address: "Calle 41 # 55-80",
      capacity: 3000,
      latitude: 6.2427,
      longitude: -75.5761,
      imageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    });

    const venue3 = await this.venueRepository.save({
      name: "Movistar Arena",
      city: "Bogotá",
      address: "Diagonal 61C # 26-36",
      capacity: 14000,
      latitude: 4.6489,
      longitude: -74.0776,
      imageURL: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    });

    this.logger.log(
      "📍 Seeded 3 venues: Teatro Metropolitano, Plaza Mayor, Movistar Arena",
    );

    // 3. Seed Events
    const event1 = await this.eventRepository.save({
      title: "Concierto Filarmónica de Medellín",
      description:
        "Espectacular noche de música clásica y sinfónica con la orquesta filarmónica.",
      type: "Concert",
      category: "Music",
      date: "2026-11-20",
      time: "20:00",
      duration: "2h",
      price: 85000,
      status: "Active",
      imageURL: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6",
      venueId: venue1.id,
    });

    const event2 = await this.eventRepository.save({
      title: "Feria de Innovación & Tech 2026",
      description:
        "El evento tecnológico más importante de la región con conferencias y stands.",
      type: "Conference",
      category: "Technology",
      date: "2026-12-05",
      time: "09:00",
      duration: "8h",
      price: 45000,
      status: "Active",
      imageURL: "https://images.unsplash.com/photo-1511578314322-379afb476865",
      venueId: venue2.id,
    });

    const event3 = await this.eventRepository.save({
      title: "Festival Rock & Pop Colombia",
      description:
        "Bandas nacionales e internacionales reunidas en una jornada única.",
      type: "Festival",
      category: "Music",
      date: "2026-11-28",
      time: "16:00",
      duration: "6h",
      price: 150000,
      status: "Active",
      imageURL: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
      venueId: venue3.id,
    });

    const event4 = await this.eventRepository.save({
      title: "Noche de Stand Up Comedy",
      description:
        "Los mejores comediantes del país en una noche llena de risas.",
      type: "Conference",
      category: "Comedy",
      date: "2026-12-12",
      time: "19:30",
      duration: "2h",
      price: 60000,
      status: "Active",
      imageURL: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca",
      venueId: venue1.id,
    });

    this.logger.log("🎉 Seeded 4 events linked to venues");

    // 4. Seed Tickets for normal user
    await this.ticketRepository.save([
      {
        status: "Valid",
        eventId: event1.id,
        userId: normalUser.id,
      },
      {
        status: "Valid",
        eventId: event1.id,
        userId: normalUser.id,
      },
      {
        status: "Valid",
        eventId: event2.id,
        userId: normalUser.id,
      },
      {
        status: "Valid",
        eventId: event3.id,
        userId: normalUser.id,
      },
      {
        status: "Valid",
        eventId: event4.id,
        userId: normalUser.id,
      },
    ]);

    this.logger.log("🎟️ Seeded 5 initial tickets for user demo");
    this.logger.log("✅ Initial database seed completed successfully!");
  }
}

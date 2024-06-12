import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Guest, GuestSchema } from 'src/guests/schemas/guest.schema';
import { Motor, MotorSchema } from 'src/motors/schemas/motor.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Booking.name, schema: BookingSchema },
    { name: Guest.name, schema: GuestSchema },
    { name: Motor.name, schema: MotorSchema },
  ])],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule { }

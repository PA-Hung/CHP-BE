import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Motor, MotorSchema } from 'src/motors/schemas/motor.schema';
import { Payment, PaymentSchema } from 'src/payments/schemas/payment.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Booking.name, schema: BookingSchema },
    { name: Payment.name, schema: PaymentSchema },
    { name: Motor.name, schema: MotorSchema },
  ])],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule { }

import { Module } from '@nestjs/common';
import { MotorsService } from './motors.service';
import { MotorsController } from './motors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Motor, MotorSchema } from './schemas/motor.schema';
import { Booking, BookingSchema } from 'src/bookings/schemas/booking.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Motor.name, schema: MotorSchema },
    { name: Booking.name, schema: BookingSchema },
  ])],
  controllers: [MotorsController],
  providers: [MotorsService]
})
export class MotorsModule { }

import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { Booking, BookingSchema } from 'src/bookings/schemas/booking.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Payment.name, schema: PaymentSchema },
    { name: Booking.name, schema: BookingSchema },
  ])],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule { }

import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';
import { Accommodation, AccommodationSchema } from 'src/accommodation/schemas/accommodation.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Apartment.name, schema: ApartmentSchema },
    { name: Accommodation.name, schema: AccommodationSchema },
  ])],
  controllers: [ApartmentController],
  providers: [ApartmentService]
})
export class ApartmentModule { }

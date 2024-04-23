import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accommodation, AccommodationSchema } from './schemas/accommodation.schema';
import { Apartment, ApartmentSchema } from 'src/apartment/schemas/apartment.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Accommodation.name, schema: AccommodationSchema },
    { name: Apartment.name, schema: ApartmentSchema },
  ])],
  controllers: [AccommodationController],
  providers: [AccommodationService]
})
export class AccommodationModule { }

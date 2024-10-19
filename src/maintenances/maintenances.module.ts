import { Module } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Motor, MotorSchema } from 'src/motors/schemas/motor.schema';
import { Maintenance, MaintenanceSchema } from './schemas/maintenance.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Maintenance.name, schema: MaintenanceSchema },
    { name: Motor.name, schema: MotorSchema },
  ])],
  controllers: [MaintenancesController],
  providers: [MaintenancesService]
})
export class MaintenancesModule { }

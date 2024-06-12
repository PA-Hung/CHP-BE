import { Module } from '@nestjs/common';
import { MotorsService } from './motors.service';
import { MotorsController } from './motors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Motor, MotorSchema } from './schemas/motor.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Motor.name, schema: MotorSchema },
  ])],
  controllers: [MotorsController],
  providers: [MotorsService]
})
export class MotorsModule { }

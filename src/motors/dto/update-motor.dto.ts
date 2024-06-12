import { PartialType } from '@nestjs/mapped-types';
import { CreateMotorDto } from './create-motor.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMotorDto extends PartialType(CreateMotorDto) {
    @IsNotEmpty()
    _id: string
}

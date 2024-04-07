import { PartialType } from '@nestjs/mapped-types';
import { CreateApartmentDto } from './create-apartment.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateApartmentDto extends PartialType(CreateApartmentDto) {
    @IsNotEmpty()
    _id: string
}

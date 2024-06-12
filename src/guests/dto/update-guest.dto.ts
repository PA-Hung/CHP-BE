import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestDto } from './create-guest.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateGuestDto extends PartialType(CreateGuestDto) {
    @IsNotEmpty()
    _id: string
}

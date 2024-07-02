import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @IsNotEmpty()
    _id: string
}

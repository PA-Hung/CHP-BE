import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceDto } from './create-maintenance.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {
    @IsNotEmpty()
    _id: string
}

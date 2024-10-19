import { IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateMaintenanceDto {
    @IsNotEmpty()
    @IsMongoId()
    motor_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    user_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    start_date: Date

    end_date: Date

    @IsNotEmpty()
    supplier: string

    @IsNotEmpty()
    total_bill: Number

    @IsNotEmpty()
    status: string

    @IsNotEmpty()
    maintenance_list: {
        _id: string,
        service: string,
        unit: string,
        quantity: string,
        price: Number,
        total: Number,
        note: string,

        updatedAt: Date,
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId,
            phone: string
        };
    }[]
}

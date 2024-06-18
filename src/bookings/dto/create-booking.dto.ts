import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose, { Types } from "mongoose";

export class CreateBookingDto {

    @IsNotEmpty()
    start_date: Date

    end_date: Date

    @IsNotEmpty()
    @IsMongoId()
    guest_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    user_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    motors: {
        license: string,
        brand: string,
        status: string,
        start_date: Date,
        end_date: Date
        updatedAt: Date,
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId,
            phone: string
        };
    }[]

    @IsNotEmpty()
    method: string

    discount: Number

    deposit: Number

    @IsNotEmpty()
    status: String

    @IsNotEmpty()
    amount: Number

}

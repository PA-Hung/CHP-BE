import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose, { Types } from "mongoose";

export class CreateBookingDto {

    @IsNotEmpty()
    start_date: Date

    @IsNotEmpty()
    end_date: Date

    @IsNotEmpty()
    num_nights: Number

    @IsNotEmpty()
    @IsMongoId()
    guest_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId({ each: true })
    @IsArray()
    @Type(() => Types.ObjectId) // Chuyển đổi kiểu của mỗi phần tử thành ObjectId
    motor_id: mongoose.Schema.Types.ObjectId[]

    status: String

    @IsNotEmpty()
    amount: Number

}

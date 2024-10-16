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
    commission: Number

    @IsNotEmpty()
    motors: {
        _id: string,
        license: string,
        brand: string,
        rental_status: boolean,
        start_date: Date,
        end_date: Date,
        amount: Number,
        late_time: Date,
        late_fee_amount: Number,
        updatedAt: Date,
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId,
            phone: string
        };
    }[]

    @IsNotEmpty()
    method: string
    @IsNotEmpty()
    discount: Number
    @IsNotEmpty()
    deposit: Number
    @IsNotEmpty()
    surcharge: Number

    @IsNotEmpty()
    contract_status: String

    contract_type: string
    @IsNotEmpty()
    remaining_amount: Number
    @IsNotEmpty()
    late_fee_amount: Number

    @IsNotEmpty()
    amount: Number

}

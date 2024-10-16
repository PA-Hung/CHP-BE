import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreatePaymentDto {
    @IsNotEmpty()
    booking_id: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    guest_id: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    user_id: mongoose.Schema.Types.ObjectId;

    commission: Number
    discount: Number
    deposit: Number
    surcharge: Number
    late_fee_amount: Number

    @IsNotEmpty()
    amount: Number
    @IsNotEmpty()
    paid: Number
    @IsNotEmpty()
    contract_type: string
    @IsNotEmpty()
    payment_method: string
    @IsNotEmpty()
    payment_date: Date
}

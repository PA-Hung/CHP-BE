import mongoose from "mongoose";

export class CreatePaymentDto {
    booking_id: mongoose.Schema.Types.ObjectId;

    amount: Number

    payment_method: string

    payment_date: Date
}

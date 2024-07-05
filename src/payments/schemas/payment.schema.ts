import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Booking } from 'src/bookings/schemas/booking.schema';
import { Guest } from 'src/guests/schemas/guest.schema';
import { User } from 'src/users/schemas/user.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Booking.name })
    booking_id: mongoose.Schema.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Guest.name })
    guest_id: mongoose.Schema.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: mongoose.Schema.Types.ObjectId;
    @Prop()
    commission: Number
    @Prop()
    discount: Number
    @Prop()
    deposit: Number
    @Prop()
    amount: Number
    @Prop()
    late_fee_amount: Number
    @Prop()
    paid: Number
    @Prop()
    payment_method: string
    @Prop()
    payment_date: Date

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        phone: string
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        phone: string
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        phone: string
    };

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);


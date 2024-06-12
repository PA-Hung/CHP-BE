import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Guest } from 'src/guests/schemas/guest.schema';
import { Motor, } from 'src/motors/schemas/motor.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {

    @Prop()
    start_date: Date

    @Prop()
    end_date: Date

    @Prop()
    num_nights: Number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Guest.name })
    guest_id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Motor.name })
    motor_id: Motor[]

    @Prop()
    status: String

    @Prop()
    amount: Number

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

export const BookingSchema = SchemaFactory.createForClass(Booking);


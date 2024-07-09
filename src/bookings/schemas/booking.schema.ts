import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Guest } from 'src/guests/schemas/guest.schema';
import { User } from 'src/users/schemas/user.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {

    @Prop()
    start_date: Date

    @Prop()
    end_date: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Guest.name })
    guest_id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: mongoose.Schema.Types.ObjectId;

    @Prop()
    commission: Number

    @Prop({ type: mongoose.Schema.Types.Array })
    motors: {
        _id: string,
        license: string,
        brand: string,
        status: string,
        start_date: Date,
        end_date: Date,
        amount: Number,
        late_fee_amount: Number,
        updatedAt: Date,
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId,
            phone: string
        };
    }[]

    @Prop()
    method: string
    @Prop()
    discount: Number
    @Prop()
    deposit: Number

    @Prop()
    contract_status: String

    @Prop()
    contract_type: string

    @Prop()
    remaining_amount: Number

    @Prop()
    late_fee_amount: Number

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


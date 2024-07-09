import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MotorDocument = HydratedDocument<Motor>;

@Schema({ timestamps: true })
export class Motor {

    @Prop()
    license: string
    @Prop()
    brand: string
    @Prop()
    availability_status: boolean
    @Prop()
    rental_status: boolean
    @Prop()
    priceD: Number
    @Prop()
    priceH: Number
    @Prop()
    overtime: Number
    @Prop()
    note: string

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

export const MotorSchema = SchemaFactory.createForClass(Motor);
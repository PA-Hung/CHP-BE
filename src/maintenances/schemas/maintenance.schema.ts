import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Motor } from 'src/motors/schemas/motor.schema';
import { User } from 'src/users/schemas/user.schema';

export type MaintenanceDocument = HydratedDocument<Maintenance>;

@Schema({ timestamps: true })
export class Maintenance {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Motor.name })
    motor_id: mongoose.Schema.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: mongoose.Schema.Types.ObjectId;
    @Prop()
    start_date: Date
    @Prop()
    end_date: Date
    @Prop()
    supplier: string
    @Prop()
    total_bill: Number
    @Prop()
    status: string
    @Prop({ type: mongoose.Schema.Types.Array })
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

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);

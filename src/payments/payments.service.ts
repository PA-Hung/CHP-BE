import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectModel(Payment.name)
    private paymentModel: SoftDeleteModel<PaymentDocument>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto, userInfo: IUser) {
    const resData = await this.paymentModel.create({
      ...createPaymentDto,
      createdBy: {
        _id: userInfo._id,
        phone: userInfo.phone
      }
    })
    return resData
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}

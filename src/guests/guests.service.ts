import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest, GuestDocument } from './schemas/guest.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { Booking, BookingDocument } from 'src/bookings/schemas/booking.schema';

@Injectable()
export class GuestsService {

  constructor(
    @InjectModel(Guest.name)
    private guestModel: SoftDeleteModel<GuestDocument>,
    @InjectModel(Booking.name)
    private bookingModel: SoftDeleteModel<BookingDocument>,
  ) { }

  async create(createGuestDto: CreateGuestDto, userInfo: IUser) {
    const checkGuest = await this.guestModel.findOne({ phone: createGuestDto.phone })
    if (checkGuest) {
      throw new BadRequestException(`Số điện thoại : ${createGuestDto.phone} đã tồn tại !`);
    }
    const resData = await this.guestModel.create({
      ...createGuestDto,
      createdBy: {
        _id: userInfo._id,
        phone: userInfo.phone
      }
    })
    return resData
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.guestModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const guests = await this.guestModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result: guests //kết quả query
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} guest`;
  }

  async update(updateGuestDto: UpdateGuestDto, userInfo: IUser) {
    const updated = await this.guestModel.updateOne(
      { _id: updateGuestDto._id },
      {
        ...updateGuestDto,
        updatedBy: {
          _id: userInfo._id,
          phone: userInfo.phone
        }
      }
    );
    return updated
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Khách hàng không tồn tại !"
    }

    const existingRental = await this.bookingModel.find({ guest_id: id })
    if (existingRental.length !== 0) {
      throw new BadRequestException(`Khách hàng đã có hợp đồng thuê xe !`);
    }

    return this.guestModel.deleteOne({ _id: id })
  }
}

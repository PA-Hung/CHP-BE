import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { Motor, MotorDocument } from 'src/motors/schemas/motor.schema';

@Injectable()
export class BookingsService {

  constructor(
    @InjectModel(Booking.name)
    private bookingModel: SoftDeleteModel<BookingDocument>,
    @InjectModel(Motor.name)
    private motorModel: SoftDeleteModel<MotorDocument>,
  ) { }

  async create(createBookingDto: CreateBookingDto, userInfo: IUser) {
    const resData = await this.bookingModel.create({
      ...createBookingDto,
      motors: createBookingDto.motors,
      createdBy: {
        _id: userInfo._id,
        phone: userInfo.phone
      }
    })

    // Cập nhật rental_status của từng rentalMotor
    for (const motor of createBookingDto.motors) {
      await this.motorModel.updateOne(
        { _id: motor._id },
        { $set: { rental_status: motor.rental_status } }
      );
    }

    return resData
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.bookingModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const bookings = await this.bookingModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({ path: "guest_id", select: { _id: 1, name: 1, phone: 1, cccd: 1 }, })
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result: bookings //kết quả query
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async update(updateBookingDto: UpdateBookingDto, userInfo: IUser) {
    if (updateBookingDto.status === "Hợp đồng mở") {

      // Lấy ra danh sách các _id của motors trong booking
      const motorIds = updateBookingDto.motors.map(motor => motor._id);

      // Cập nhật trạng thái rental_status của các motor về false
      await this.motorModel.updateMany(
        { _id: { $in: motorIds } },
        { $set: { rental_status: true } }
      );

      const updated = await this.bookingModel.updateOne(
        { _id: updateBookingDto._id },
        {
          ...updateBookingDto,
          motors: updateBookingDto.motors,
          updatedBy: {
            _id: userInfo._id,
            phone: userInfo.phone
          }
        }
      );
      return updated
    }
    if (updateBookingDto.status === "Hợp đồng đóng") {

      // Lấy ra danh sách các _id của motors trong booking
      const motorIds = updateBookingDto.motors.map(motor => motor._id);

      // Cập nhật trạng thái rental_status của các motor về false
      await this.motorModel.updateMany(
        { _id: { $in: motorIds } },
        { $set: { rental_status: false } }
      );

      const updated = await this.bookingModel.updateOne(
        { _id: updateBookingDto._id },
        {
          ...updateBookingDto,
          motors: updateBookingDto.motors,
          updatedBy: {
            _id: userInfo._id,
            phone: userInfo.phone
          }
        }
      );
      return updated
    }
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Hợp đồng không tồn tại !"
    }
    // Tìm booking cần xoá để lấy thông tin motors
    const booking = await this.bookingModel.findOne({ _id: id });
    if (!booking) {
      return "Hợp đồng không tồn tại!";
    }

    // Lấy ra danh sách các _id của motors trong booking
    const motorIds = booking.motors.map(motor => motor._id);

    // Cập nhật trạng thái rental_status của các motor về false
    await this.motorModel.updateMany(
      { _id: { $in: motorIds } },
      { $set: { rental_status: false } }
    );

    return this.bookingModel.deleteOne({ _id: id })
  }
}

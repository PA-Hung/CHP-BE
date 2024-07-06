import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Accommodation, AccommodationDocument } from './schemas/accommodation.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose, { PipelineStage, Types } from 'mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

@Injectable()
export class AccommodationService {

  constructor(
    @InjectModel(Accommodation.name)
    private accommodationModel: SoftDeleteModel<AccommodationDocument>,
  ) { }

  async create(createAccommodationDto: CreateAccommodationDto, userAuthInfo: IUser) {
    const formattedBirthDate = dayjs(createAccommodationDto.birthday, 'DD/MM/YYYY').format();
    const formattedArrivalDate = dayjs(createAccommodationDto.arrival).set('hour', 14).set('minute', 0).set('second', 0);
    // nhận phòng lúc 2h chiều
    const formattedDepartureDate = dayjs(createAccommodationDto.departure).set('hour', 12).set('minute', 0).set('second', 0);
    // trả phòng lúc 12h trưa

    // const checkExistingRecord = await this.accommodationModel.findOne({
    //   $or: [
    //     { identification_number: createAccommodationDto.identification_number },
    //     { passport: createAccommodationDto.passport }
    //   ],
    //   arrival: {
    //     $gte: formattedArrivalDate
    //   },
    //   departure: {
    //     $lte: formattedDepartureDate
    //   }
    // });

    // if (checkExistingRecord) {
    //   throw new BadRequestException(`Thông tin lưu trú của : ${createAccommodationDto.name} đã tồn tại !`);
    // }

    const formattedBirthDateObj = dayjs(formattedBirthDate);
    if (!formattedBirthDateObj.isBefore(dayjs().startOf('day'))) {
      throw new BadRequestException(`Ngày sinh phải bé hơn ngày hiện tại !`);
    }

    if (formattedDepartureDate.isBefore(formattedArrivalDate)) {
      throw new BadRequestException('Ngày khởi hành phải lớn hơn hoặc bằng ngày đến !');
    }

    const resData = await this.accommodationModel.create({
      userId: userAuthInfo._id,
      ...createAccommodationDto,
      birthday: formattedBirthDate,
      arrival: formattedArrivalDate,
      departure: formattedDepartureDate,
      createdBy: {
        _id: userAuthInfo._id,
        phone: userAuthInfo.phone
      }
    })
    return resData
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);

    // Kiểm tra xem có trường userId trong filter không
    if (filter.userId) {
      //Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.userId = String(filter.userId).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành ObjectId nếu giá trị là một chuỗi ObjectId hợp lệ
      if (Types.ObjectId.isValid(filter.userId)) {
        filter.userId = new Types.ObjectId(filter.userId);
      }
    }

    // Kiểm tra xem có trường apartment trong filter không
    if (filter.apartment) {
      //Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.apartment = String(filter.apartment).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành ObjectId nếu giá trị là một chuỗi ObjectId hợp lệ
      if (Types.ObjectId.isValid(filter.apartment)) {
        filter.apartment = new Types.ObjectId(filter.apartment);
      }
    }

    if (filter.arrival) {
      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.arrival = String(filter.arrival).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.arrival).isValid()) {
        // Tạo điều kiện tìm kiếm
        filter.arrival = {
          $gte: dayjs(filter.arrival).startOf('day').add(14, 'hours').toDate(), // lớn hơn hoặc bằng checkin 2h chiều
        };
      }
    }

    if (filter.departure) {
      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.departure = String(filter.departure).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.departure).isValid()) {
        // Tạo điều kiện tìm kiếm
        filter.departure = {
          $lte: dayjs(filter.departure).endOf('day').add(12, 'hours').toDate() // Nhỏ hơn hoặc bằng checkout 12 giờ 
        };
      }
    }

    delete filter.current
    delete filter.pageSize
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.accommodationModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.accommodationModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({ path: "apartment", select: { _id: 1, code: 1 } })
      .select('')
      .exec();
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  async dashboard(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);

    if (filter.arrival) {
      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.arrival = String(filter.arrival).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.arrival).isValid()) {
        // Tạo điều kiện tìm kiếm
        filter.arrival = {
          $gte: dayjs(filter.arrival).startOf('day').add(14, 'hours').toDate(), // Lớn hơn hoặc bằng 14 giờ
        };
      }
    }

    if (filter.departure) {
      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.departure = String(filter.departure).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.departure).isValid()) {
        // Tạo điều kiện tìm kiếm
        filter.departure = {
          $lte: dayjs(filter.departure).endOf('day').add(12, 'hours').toDate() // Nhỏ hơn hoặc bằng 12 giờ
        };
      }
    }

    delete filter.current
    delete filter.pageSize
    // Tính offset và giới hạn mặc định
    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit ? limit : 10;

    // Định nghĩa pipeline aggregation
    const aggregationPipeline: PipelineStage[] = [
      { $match: filter },
      {
        $group: {
          _id: "$apartment",
          count: { $sum: 1 }, // Đếm số lượng phần tử trong mỗi nhóm
        },
      },
      {
        $lookup: {
          from: "apartments", // Tên collection của Apartment
          localField: "_id",
          foreignField: "_id",
          as: "apartmentInfo",
        },
      },
      { $unwind: "$apartmentInfo" }, // Giải nén mảng apartmentInfo
      {
        $project: {
          _id: 1,
          count: 1,
          code: "$apartmentInfo.code", // Lấy tên của apartment từ apartmentInfo
        },
      },
    ];
    if (projection) {
      aggregationPipeline.push({ $project: projection } as any);
    }

    const result = await this.accommodationModel.aggregate(aggregationPipeline).exec();;
    const totalItems = result ? result.length : 0;
    // Tính tổng số trang
    const totalPages = Math.ceil(totalItems / defaultLimit);

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} accommodation`;
  }

  async update(updateAccommodationDto: UpdateAccommodationDto, userInfo: IUser) {
    const formattedBirthDate = dayjs(updateAccommodationDto.birthday, 'DD/MM/YYYY').format();
    const formattedArrivalDate = dayjs(updateAccommodationDto.arrival).set('hour', 14).set('minute', 0).set('second', 0);
    // nhận phòng lúc 2h chiều
    const formattedDepartureDate = dayjs(updateAccommodationDto.departure).set('hour', 12).set('minute', 0).set('second', 0);
    // trả phần lúc 12h trưa

    // const checkExistingRecord = await this.accommodationModel.findOne({
    //   _id: { $ne: updateAccommodationDto._id },
    //   $or: [
    //     { identification_number: updateAccommodationDto.identification_number },
    //     { passport: updateAccommodationDto.passport }
    //   ],
    //   arrival: {
    //     $gte: formattedArrivalDate
    //   },
    //   departure: {
    //     $lte: formattedDepartureDate
    //   }
    // });

    // if (checkExistingRecord) {
    //   throw new BadRequestException(`Thông tin lưu trú của : ${updateAccommodationDto.name} đã tồn tại !`);
    // }

    const formattedBirthDateObj = dayjs(formattedBirthDate);
    if (!formattedBirthDateObj.isBefore(dayjs().startOf('day'))) {
      throw new BadRequestException(`Ngày sinh phải bé hơn ngày hiện tại !`);
    }

    if (formattedDepartureDate.isBefore(formattedArrivalDate)) {
      throw new BadRequestException('Ngày khởi hành phải lớn hơn ngày đến !');
    }

    const updated = await this.accommodationModel.updateOne(
      { _id: updateAccommodationDto._id },
      {
        ...updateAccommodationDto,
        birthday: formattedBirthDate,
        arrival: formattedArrivalDate,
        departure: formattedDepartureDate,
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
      return "Lưu trú không tồn tại !"
    }
    return this.accommodationModel.deleteOne({ _id: id })
  }
}

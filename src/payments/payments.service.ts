import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { PipelineStage } from 'mongoose';
import dayjs from 'dayjs';

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

  async findAll1(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.paymentModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const bookings = await this.paymentModel.find(filter)
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

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;
    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;

    // Tổng số phần tử và tổng số trang
    const totalItems = await this.paymentModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / defaultLimit);


    // Kiểm tra và chuyển đổi start_date và end_date thành đối tượng Date nếu cần
    if (filter.start_date && filter.end_date) {

      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.start_date = String(filter.start_date).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.start_date).isValid()) {
        filter.start_date = dayjs(filter.start_date).startOf('day').toDate()
      }

      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.end_date = String(filter.end_date).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.end_date).isValid()) {
        // Tạo điều kiện tìm kiếm
        filter.end_date = dayjs(filter.end_date).endOf('day').toDate()
      }

      filter.payment_date = {
        $gte: filter.start_date,
        $lte: filter.end_date
      };

      delete filter.start_date;
      delete filter.end_date;
    }

    // Sử dụng aggregation để nhóm theo payment_date
    const aggregationPipeline: PipelineStage[] = [
      { $match: filter },
      {
        $addFields: {
          totalPaidAndDeposit: { $sum: ["$paid", "$deposit"] }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$payment_date" }
          },
          payments: { $push: "$$ROOT" },
          totalPaid: { $sum: "$totalPaidAndDeposit" }, // Tính tổng paid từ mảng payments
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          payment_date: -1 // Example: Sort by payment_date in descending order
        }
      },
    ];

    if (projection) {
      aggregationPipeline.push({ $project: projection } as any);
    }

    const result = await this.paymentModel.aggregate(aggregationPipeline).exec();

    return {
      meta: {
        current: currentPage, // trang hiện tại
        pageSize: limit, // số lượng bản ghi đã lấy
        pages: totalPages, // tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result: result // kết quả query
    };
  }

  async findAllSales(currentPage: number, limit: number, queryString: string) {
    const { filter, projection, sort, population } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;
    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;

    // Tổng số phần tử và tổng số trang
    const totalItems = await this.paymentModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / defaultLimit);


    // Kiểm tra và chuyển đổi start_date và end_date thành đối tượng Date nếu cần
    if (filter.start_date && filter.end_date) {

      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.start_date = String(filter.start_date).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.start_date).isValid()) {
        filter.start_date = dayjs(filter.start_date).startOf('day').toDate()
      }

      // Chuyển nó thành String và Xoá bỏ / ở đầu và /i ở cuối (nếu có)
      filter.end_date = String(filter.end_date).replace(/^\/|\/i$/g, '');
      // Chuyển đổi thành một đối tượng ngày tháng nếu giá trị là một chuỗi ngày tháng hợp lệ
      if (dayjs(filter.end_date).isValid()) {
        // Tạo điều kiện tìm kiếm
        filter.end_date = dayjs(filter.end_date).endOf('day').toDate()
      }

      filter.payment_date = {
        $gte: filter.start_date,
        $lte: filter.end_date
      };

      delete filter.start_date;
      delete filter.end_date;
    }

    // Sử dụng aggregation để nhóm theo payment_date
    const aggregationPipeline: PipelineStage[] = [
      { $match: filter },
      {
        $addFields: {
          totalPaidAndDeposit: { $sum: ["$paid", "$deposit"] }
        }
      },
      {
        $group: {
          _id: "$user_id",
          payments: { $push: "$$ROOT" },
          totalPaid: { $sum: "$totalPaidAndDeposit" }, // Tính tổng paid từ mảng payments
          totalCommission: { $sum: "$commission" },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users', // Tên của collection khác bạn muốn join
          localField: '_id', // Trường trong collection hiện tại (paymentModel) dùng để join
          foreignField: '_id', // Trường trong collection 'users' dùng để join với localField
          as: 'user' // Tên của mảng kết quả sau khi join (có thể đặt là bất cứ cái gì)
        }
      },
      {
        $sort: {
          payment_date: -1 // Example: Sort by payment_date in descending order
        }
      },
    ];

    if (projection) {
      aggregationPipeline.push({ $project: projection } as any);
    }

    const result = await this.paymentModel.aggregate(aggregationPipeline).exec();

    return {
      meta: {
        current: currentPage, // trang hiện tại
        pageSize: limit, // số lượng bản ghi đã lấy
        pages: totalPages, // tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result: result // kết quả query
    };
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

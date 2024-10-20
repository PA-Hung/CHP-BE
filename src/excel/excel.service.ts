import { Injectable } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import * as xlsx from 'xlsx';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Accommodation, AccommodationDocument } from 'src/accommodation/schemas/accommodation.schema';
import dayjs from 'dayjs';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { ADMIN_ROLE } from 'src/databases/sample';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

@Injectable()
export class ExcelService {

  constructor(
    @InjectModel(Accommodation.name)
    private AccommodationModel: SoftDeleteModel<AccommodationDocument>,
  ) { }

  async importExcel(file: Express.Multer.File, apartmentId: string, userInfo: IUser) {
    try {
      const apartmentObjectId = new ObjectId(apartmentId);
      // chuyen string ngay thang khong dung chuẩn về đúng chuẩn ISO8601 và convert thanh kieu Date đưa vào db
      const convertToISO8601DateBirthday = (inputDate: string): dayjs.Dayjs | null => {
        const [day, month, year] = inputDate.split('/');
        if (!(day && month)) {
          return null;
        }
        const formattedDate = year
          ? dayjs(`${year}-${month}-${day}T00:00:00.000Z`)
          : dayjs(`${new Date().getFullYear()}-${month}-${day}T00:00:00.000Z`);
        return formattedDate.isValid() ? formattedDate : null;
      };

      const convertToISO8601DateArrival = (inputDate: string): dayjs.Dayjs | null => {
        const [day, month, year] = inputDate.split('/');
        if (!(day && month)) {
          return null;
        }
        const formattedDate = year
          ? dayjs(`${year}-${month}-${day}T21:00:00.000Z`)
          : dayjs(`${new Date().getFullYear()}-${month}-${day}T21:00:00.000Z`);
        return formattedDate.isValid() ? formattedDate : null;
      };

      const convertToISO8601DateDeparture = (inputDate: string): dayjs.Dayjs | null => {
        const [day, month, year] = inputDate.split('/');
        if (!(day && month)) {
          return null;
        }
        const formattedDate = year
          ? dayjs(`${year}-${month}-${day}T19:00:00.000Z`)
          : dayjs(`${new Date().getFullYear()}-${month}-${day}T19:00:00.000Z`);
        return formattedDate.isValid() ? formattedDate : null;
      };

      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetNames = workbook.SheetNames;

      for (const sheetName of sheetNames) {
        const sheet = workbook.Sheets[sheetName];

        const rawData = xlsx.utils.sheet_to_json(sheet, { header: 2 });
        rawData.shift();

        const mappedData = rawData.map((item) => ({
          userId: userInfo._id,
          name: item['Họ và tên (*)'] || '',
          birthday: convertToISO8601DateBirthday(item['Ngày, tháng, năm sinh (*)']) || null,
          gender: item['Giới tính (*)'] || '',
          identification_number: item['CMND/ CCCD/ Số định danh (*)'] || '',
          passport: item['Số hộ chiếu (*)'] || '',
          documents: item['Giấy tờ khác (*)'] || '',
          phone: item['Số điện thoại'] || '',
          job: item['Nghề nghiệp'] || '',
          workplace: item['Nơi làm việc'] || '',
          ethnicity: item['Dân tộc'] || '',
          nationality: item['Quốc tịch (*)'] || '',
          country: item['Địa chỉ – Quốc gia (*)'] || '',
          province: item['Địa chỉ – Tỉnh thành'] || '',
          district: item['Địa chỉ – Quận huyện'] || '',
          ward: item['Địa chỉ – Phường xã'] || '',
          address: item['Địa chỉ – Số nhà'] || '',
          residential_status: item['Loại cư trú (*)'] || '',
          arrival: convertToISO8601DateArrival(item['Thời gian lưu trú (đến ngày) (*)']) || null,
          departure: convertToISO8601DateDeparture(item['Thời gian lưu trú (đi ngày)']) || null,
          reason: item['Lý do lưu trú'] || '',
          apartment: apartmentObjectId,
        }));

        // Process the 'mappedData' array as needed
        await this.AccommodationModel.create(mappedData);
      }
      return { success: true, message: 'Nhập file thành công !' };
    } catch (error) {
      return { success: false, error: 'Invalid Excel file' };
    }
  }

  async exportExcel(currentPage: number, limit: number, queryString: string) {
    try {

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

      delete filter.current
      delete filter.pageSize
      let offset = (+currentPage - 1) * (+limit);
      let defaultLimit = +limit ? +limit : 10;
      const totalItems = (await this.AccommodationModel.find(filter)).length;
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.AccommodationModel.find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate({ path: "apartment", select: { _id: 1, code: 1 } })
        .select('')
        .exec();

      // chuyển định dạng ngày tháng năm chuẩn ISO8601 thành DD/MM/YYY
      const formatDate = (date: Date) => {
        return dayjs(date).format('DD/MM/YYYY');
      }
      let stt = 1; // Biến đếm số thứ tự
      // Prepare worksheet data, handling dates appropriately
      const worksheetData = result.map((accommodation) => ({
        'STT': stt++,
        'Họ và tên (*)': accommodation.name,
        'Ngày, tháng, năm sinh (*)': formatDate(accommodation.birthday),
        'Giới tính (*)': accommodation.gender,
        'CMND/ CCCD/ Số định danh (*)': accommodation.identification_number,
        'Số hộ chiếu (*)': accommodation.passport,
        'Giấy tờ khác (*)': accommodation.documents,
        'Số điện thoại': accommodation.phone,
        'Nghề nghiệp': accommodation.job,
        'Nơi làm việc': accommodation.workplace,
        'Dân tộc': accommodation.ethnicity,
        'Quốc tịch (*)': accommodation.nationality,
        'Địa chỉ – Quốc gia (*)': accommodation.country,
        'Địa chỉ – Tỉnh thành': accommodation.province,
        'Địa chỉ – Quận huyện': accommodation.district,
        'Địa chỉ – Phường xã': accommodation.ward,
        'Địa chỉ – Số nhà': accommodation.address,
        'Loại cư trú (*)': accommodation.residential_status,
        'Thời gian lưu trú (đến ngày) (*)': formatDate(accommodation.arrival),
        'Thời gian lưu trú (đi ngày)': accommodation.departure ? formatDate(accommodation.departure) : '',
        'Lý do lưu trú': accommodation.reason,
        'Số phòng/Mã căn hộ': (accommodation.apartment as any)?.code ?? '',
        // Add other fields as needed
      }));

      return worksheetData; //Assuming you have a filename set in the response object

    } catch (error) {
      return { success: false, error: 'Error exporting Excel file', details: error.message };
    }
  }

  create(createExcelDto: CreateExcelDto) {
    return 'This action adds a new excel';
  }

  async findAll(queryString: string) {
    const { filter, sort } = aqp(queryString);

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

    try {
      const result = await this.AccommodationModel.find(filter)
        .sort(sort as any)
        .populate({ path: "apartment", select: { _id: 1, code: 1 } })
        .select('')
        .exec();

      return result; //Assuming you have a filename set in the response object

    } catch (error) {
      return { success: false, error: 'Error exporting Excel file', details: error.message };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} excel`;
  }

  update(id: number, updateExcelDto: UpdateExcelDto) {
    return `This action updates a #${id} excel`;
  }

  remove(id: number) {
    return `This action removes a #${id} excel`;
  }
}

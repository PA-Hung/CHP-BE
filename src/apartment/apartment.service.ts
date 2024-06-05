import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { Accommodation, AccommodationDocument } from 'src/accommodation/schemas/accommodation.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class ApartmentService {

  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Apartment.name)
    private apartmentModel: SoftDeleteModel<ApartmentDocument>,
    @InjectModel(Accommodation.name)
    private accommodationModel: SoftDeleteModel<AccommodationDocument>,
  ) { }

  async create(createApartmentDto: CreateApartmentDto, userInfo: IUser) {
    const checkAparment = await this.apartmentModel.findOne({ code: createApartmentDto.code })
    if (checkAparment) {
      throw new BadRequestException(`Mã căn hộ : ${createApartmentDto.code} đã tồn tại !`);
    }
    const resData = await this.apartmentModel.create({
      ...createApartmentDto,
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
    const totalItems = (await this.apartmentModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const apartments = await this.apartmentModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    // Find users for each apartment
    const apartmentIds = apartments.map(apartment => apartment._id);
    const users = await this.userModel.find({ apartments: { $in: apartmentIds } })
      .select('_id name phone apartments')
      .lean()
      .exec();

    // Attach users to their respective apartments
    const apartmentsWithUsers = apartments.map(apartment => {
      const usersForApartment = users.filter(
        user => user.apartments.some(
          userApartment => userApartment.toString() === apartment._id.toString()
        )
      );
      return { ...apartment.toObject(), users: usersForApartment[0] };
    });

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result: apartmentsWithUsers //kết quả query
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} apartment`;
  }

  async update(updateApartmentDto: UpdateApartmentDto) {
    if (!mongoose.Types.ObjectId.isValid(updateApartmentDto._id)) {
      throw new BadRequestException('not found apartment !')
    }
    return await this.apartmentModel.updateOne({ _id: updateApartmentDto._id }, {
      ...updateApartmentDto,
    })
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Căn hộ không tồn tại !"
    }
    const existingUser = await this.userModel.findOne({ apartments: { $in: id }, _id: { $ne: id } }).exec();
    if (existingUser) {
      throw new BadRequestException('Mã căn hộ đã được quản lý bởi host !');
    }
    const existingAccommodation = await this.accommodationModel.find({ apartment: id })
    if (existingAccommodation.length !== 0) {
      throw new BadRequestException(`Mã căn hộ này đã được đặt cho khách lưu trú !`);
    }
    return this.apartmentModel.deleteOne({ _id: id })
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Motor, MotorDocument } from './schemas/motor.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class MotorsService {

  constructor(
    @InjectModel(Motor.name)
    private motorModel: SoftDeleteModel<MotorDocument>,
  ) { }

  async create(createMotorDto: CreateMotorDto, userInfo: IUser) {
    const checkMotor = await this.motorModel.findOne({ license: createMotorDto.license })
    if (checkMotor) {
      throw new BadRequestException(`Xe : ${createMotorDto.license} đã tồn tại !`);
    }
    const resData = await this.motorModel.create({
      ...createMotorDto,
      rental_status: false,
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
    const totalItems = (await this.motorModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const motors = await this.motorModel.find(filter)
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
      result: motors //kết quả query
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} motor`;
  }

  async update(updateMotorDto: UpdateMotorDto, userInfo: IUser) {
    const updated = await this.motorModel.updateOne(
      { _id: updateMotorDto._id },
      {
        ...updateMotorDto,
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
      return "Xe không tồn tại !"
    }
    return this.motorModel.deleteOne({ _id: id })
  }
}

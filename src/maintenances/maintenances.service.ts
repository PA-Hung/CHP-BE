import { Injectable } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Motor, MotorDocument } from 'src/motors/schemas/motor.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { Maintenance } from './schemas/maintenance.schema';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class MaintenancesService {

  constructor(
    @InjectModel(Maintenance.name)
    private maintenanceModel: SoftDeleteModel<MotorDocument>,
    @InjectModel(Motor.name)
    private motorModel: SoftDeleteModel<MotorDocument>,
  ) { }

  async create(createMaintenanceDto: CreateMaintenanceDto, userInfo: IUser) {
    await this.motorModel.findByIdAndUpdate(createMaintenanceDto.motor_id, { availability_status: false });
    const resData = await this.maintenanceModel.create({
      ...createMaintenanceDto,
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
    const totalItems = (await this.maintenanceModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.maintenanceModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({ path: "motor_id", select: { _id: 1, license: 1, brand: 1 }, })
      .populate({ path: "user_id", select: { _id: 1, name: 1 }, })
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result: result //kết quả query
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  async update(updateMaintenanceDto: UpdateMaintenanceDto, userInfo: IUser) {
    await this.motorModel.findByIdAndUpdate(updateMaintenanceDto.motor_id, { availability_status: false });
    const maintenance = await this.maintenanceModel.findOne<Maintenance>({ _id: updateMaintenanceDto._id })
    await this.motorModel.findByIdAndUpdate(maintenance.motor_id, { availability_status: true });
    const updated = await this.maintenanceModel.updateOne(
      { _id: updateMaintenanceDto._id },
      {
        ...updateMaintenanceDto,
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
      return "Phiếu bảo trì không tồn tại !"
    }
    const maintenance = await this.maintenanceModel.findOne<Maintenance>({ _id: id })
    await this.motorModel.findByIdAndUpdate(maintenance.motor_id, { availability_status: true });
    return await this.maintenanceModel.deleteOne({ _id: id })
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { ReqUser } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('maintenances')
export class MaintenancesController {
  constructor(private readonly maintenancesService: MaintenancesService) { }

  @Post()
  create(@Body() createMaintenanceDto: CreateMaintenanceDto, @ReqUser() userInfo: IUser) {
    return this.maintenancesService.create(createMaintenanceDto, userInfo);
  }

  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.maintenancesService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenancesService.findOne(+id);
  }

  @Patch()
  update(@Body() updateMaintenanceDto: UpdateMaintenanceDto, @ReqUser() userInfo: IUser) {
    return this.maintenancesService.update(updateMaintenanceDto, userInfo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenancesService.remove(id);
  }
}

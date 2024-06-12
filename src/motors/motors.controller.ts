import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MotorsService } from './motors.service';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { ReqUser } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('motors')
export class MotorsController {
  constructor(private readonly motorsService: MotorsService) { }

  @Post()
  create(@Body() createMotorDto: CreateMotorDto, @ReqUser() userInfo: IUser) {
    return this.motorsService.create(createMotorDto, userInfo);
  }

  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.motorsService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotorDto: UpdateMotorDto) {
    return this.motorsService.update(+id, updateMotorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motorsService.remove(+id);
  }
}

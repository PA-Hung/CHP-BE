import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ReqUser } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) { }

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto, @ReqUser() userInfo: IUser) {
    return this.apartmentService.create(createApartmentDto, userInfo);
  }

  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.apartmentService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(+id);
  }

  @Patch()
  update(@Body() updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentService.update(updateApartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(id);
  }
}

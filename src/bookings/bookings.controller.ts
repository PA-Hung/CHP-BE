import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ReqUser } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @ReqUser() userInfo: IUser) {
    return this.bookingsService.create(createBookingDto, userInfo);
  }

  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.bookingsService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateBookingDto: UpdateBookingDto, @ReqUser() userInfo: IUser) {
    return this.bookingsService.update(updateBookingDto, userInfo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}

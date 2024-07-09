import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { ReqUser } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) { }

  @Post()
  create(@Body() createGuestDto: CreateGuestDto, @ReqUser() userInfo: IUser) {
    return this.guestsService.create(createGuestDto, userInfo);
  }

  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.guestsService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateGuestDto: UpdateGuestDto, @ReqUser() userInfo: IUser) {
    return this.guestsService.update(updateGuestDto, userInfo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestsService.remove(id);
  }
}

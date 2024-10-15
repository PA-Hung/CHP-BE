import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, Query } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReqUser } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) { }

  @Post('import')
  @UseInterceptors(FileInterceptor('fileExcel'))
  importExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body('apartmentId') apartmentId: string,
    @ReqUser() userInfo: IUser) {
    return this.excelService.importExcel(file, apartmentId, userInfo);
  }

  @Get('export')
  exportExcel(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string,
    @ReqUser() userInfo: IUser) {
    return this.excelService.exportExcel(+currentPage, +limit, queryString);
  }

  @Get('export-report')
  findAll(@Query() queryString: string) {
    return this.excelService.findAll(queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.excelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExcelDto: UpdateExcelDto) {
    return this.excelService.update(+id, updateExcelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.excelService.remove(+id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { iBody, iUser } from './interfaces/user.interface';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getItemDB(): iUser[] | string {
    try {
      return this.appService.getAllItem();
    } catch (error) {
      return error.message
    }
  }

  @Post()
  postItemDB(@Body() obj: iBody): iUser[] | string {
    try {
      return this.appService.postItem(obj);
    } catch (error) {
      return error.message
    }
  }

  @Put('/:id')
  putItem(@Body() obj: iBody, @Param('id') id: string): iUser[] | string {
    try {
      return this.appService.putItem(id, obj);
    } catch (error) {
      return error.message
    }
  }

  @Patch('/:id')
  patchItem(@Body() obj: Partial<iBody>, @Param('id') id: string): iUser[] | string {
    try {
      return this.appService.patchItem(id, obj);
    } catch (error) {
      return error.message
    }
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: string): iUser[] | string {
    try {
      return this.appService.deleteItem(id);
    } catch (error) {
      return error.message
    }
  }

}

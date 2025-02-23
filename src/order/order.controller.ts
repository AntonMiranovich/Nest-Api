import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './order.service';
import { iOrderBody, iOrder } from '../interfaces/user.interface';


@Controller('/orders')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getItem(): iOrder[] | string {
    try {
      return this.appService.getItem();
    } catch (error) {
      return error.message
    }
  }

  @Post()
  postItem(@Body() obj: iOrderBody): iOrder[] | string {
    try {
      return this.appService.postItem(obj);
    } catch (error) {
      return error.message
    }

  }

}

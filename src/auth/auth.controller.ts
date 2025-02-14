import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './auth.service';
import { iBody, iUser } from '../interfaces/user.interface';


@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('/reg')
  postItemDB(@Body() obj: iBody): iUser[] | string {
    try {
      return this.appService.postItem(obj);
    } catch (error) {
      return error.message
    }
  }

  @Post('/login')
  checkItemDB(@Body() obj: any): iUser[] | string {
    try {
      return this.appService.checkItemDB(obj);
    } catch (error) {
      return error.message
    }
  }


}

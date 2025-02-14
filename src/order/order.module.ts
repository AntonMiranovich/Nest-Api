import { Module } from '@nestjs/common';
import { AppController } from './order.controller';
import { AppService } from './order.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class OrderModule {}

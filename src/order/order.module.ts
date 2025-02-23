import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './order.controller';
import { AppService } from './order.service';
import { CheckAytorization, ValidationOrder } from 'src/middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class OrderModule {
  configure(objMiddleware: any) {
    objMiddleware.apply(ValidationOrder).forRoutes({ path: '/orders', method: RequestMethod.POST })
    objMiddleware.apply(CheckAytorization).forRoutes({ path: '/orders' })
  }
}

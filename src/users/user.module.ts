import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './user.controller';
import { AppService } from './user.service';
import { CheckAytorization, Validation } from 'src/middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class UsersModule {
  configure(objMiddleware: any) {
    objMiddleware.apply(Validation).forRoutes({ path: '/', method: RequestMethod.POST })
    objMiddleware.apply(CheckAytorization).forRoutes({ path: '/' })
  }
}

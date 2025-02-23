import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { Validation } from 'src/middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AuthModule {
  configure(objMiddleware: any) {
    objMiddleware.apply(Validation).forRoutes({ path: '/auth/reg', method: RequestMethod.POST })
  }
}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module'
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, OrderModule, AuthModule],
})
export class AppModule { }

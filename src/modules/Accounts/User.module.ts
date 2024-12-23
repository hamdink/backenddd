import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { DriverModule } from '../driver/driver.module';
import { MarketModule } from '../market/market.module';
import { UsersService } from './services/account.service';
import { UsersController } from './controller/account.controller';

@Module({
  imports: [AdminModule, DriverModule, MarketModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

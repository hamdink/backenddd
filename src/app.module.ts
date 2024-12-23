import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { IndexModule } from './modules/index.module';
import { ResetTotalsCronService } from './modules/reset-totals.cron';
import { PlansModule } from './modules/plans/plans.module';
import { MarketModule } from './modules/market/market.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    IndexModule,
    PlansModule,
    MarketModule, 
  ],
  controllers: [],
  providers: [ResetTotalsCronService],
})
export class AppModule {}

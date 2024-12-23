import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Market, MarketSchema } from './schema/market.schema';
import { MarketService } from './services/market.service';
import { MarketController } from './controller/market.controller';
import { AuthModule } from '../auth/auth.module';
import { GeocodingService } from '../geocoding/services/geocoding.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }]),
    AuthModule,
  ],
  providers: [MarketService,GeocodingService],
  controllers: [MarketController],
  exports: [MarketService],
})
export class MarketModule {}

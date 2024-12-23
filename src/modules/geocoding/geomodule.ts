import { Module } from '@nestjs/common';
import { GeocodingService } from './services/geocoding.service';
import { GeocodingController } from './controller/geocoding.controller';

@Module({
  imports: [],
  controllers: [GeocodingController],
  providers: [GeocodingService],
})
export class GeoModule {}

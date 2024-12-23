import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { GeocodingService } from '../services/geocoding.service';

@Controller('geocode')
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get()
  async getCoordinates(@Query('address') address: string) {
    if (!address) {
      throw new HttpException('Address query parameter is required', HttpStatus.BAD_REQUEST);
    }

    return this.geocodingService.getCoordinates(address);
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GeocodingService {
  private readonly API_KEY = 'AIzaSyCdm4vHixOK16li8k5nuGVIe3bK6fqrUbo';
  private cache = new Map<string, { latitude: number; longitude: number }>();

  async getCoordinates(address: string): Promise<{ latitude: number; longitude: number }> {
    if (this.cache.has(address)) {
      return this.cache.get(address);
    }

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
        params: {
          input: address,
          inputtype: 'textquery',
          fields: 'geometry',
          key: this.API_KEY,
        },
      });

      if (response.data.status === 'OK') {
        const location = response.data.candidates[0].geometry.location;
        const coordinates = { latitude: location.lat, longitude: location.lng };
        this.cache.set(address, coordinates);
        return coordinates;
      } else {
        throw new HttpException(`Unable to fetch coordinates: ${response.data.status}`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Error fetching coordinates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
